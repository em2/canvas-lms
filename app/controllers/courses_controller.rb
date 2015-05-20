class CoursesController < ApplicationController


  def index
    if is_teacher?
      redirect_to teacher_root_path
    end
    respond_to do |format|
      format.html {
        @current_enrollments = @current_user.cached_current_enrollments(:include_enrollment_uuid => session[:enrollment_uuid]).sort_by{|e| [e.active? ? 1 : 0, e.long_name] }
        @past_enrollments = @current_user.enrollments.ended.scoped(:conditions=>"enrollments.workflow_state NOT IN ('invited', 'deleted')")
        @past_enrollments.concat(@current_enrollments.select { |e| e.state_based_on_date == :completed })
        @current_enrollments.reject! { |e| [:inactive, :completed].include?(e.state_based_on_date) }
      }
      format.json {
        enrollments = @current_user.cached_current_enrollments
        if params[:enrollment_type]
          e_type = "#{params[:enrollment_type].capitalize}Enrollment"
          enrollments = enrollments.reject { |e| e.class.name != e_type }
        end

        includes = Set.new(Array(params[:include]))

        hash = []
        enrollments.group_by(&:course_id).each do |course_id, course_enrollments|
          course = course_enrollments.first.course
          hash << course_json(course, @current_user, session, includes, course_enrollments)
        end
        render :json => hash.to_json
      }
      report = Report.first
      @context = report unless report.nil?
    end
  end

  def show
    @course = Course.find(params[:id]) if params[:id]
  end

  def new
    @course = Course.new
  end

  def create
    course_identifier = generate_unique_course_identifier
    account = @current_user.accounts.first || @current_user.account
    name_order = params[:name_order]
    # sub_account = Account.find_by_name("district") ? Account.find_by_name("district") : Account.create!(:name => 'district', :parent_account => account)
    # sub_sub_account = Account.find_by_name("school") ? Account.find_by_name("school") : Account.create!(:name => 'school', :parent_account => sub_account)
    course = Course.new(:name => params['course']['name'], :account => account, :course_code => params['course']['name'], :em2_identifier => course_identifier)
    students_array = params['course']['students'].split(/\r?\n/)

    if students_array.present? && !validate_students_array(students_array)
      flash[:error] = 'Student list not added correctly. Could not add class.'
      redirect_to new_course_path and return
    end

    student_hashes = build_student_hashes(students_array, name_order)
    existing_students = check_for_existing_students(student_hashes)

    if existing_students.present?
      e_message = "The following student school id(s) are already in use within the EM2 system:"
      existing_students.each do |student_data|
        user = User.find_by_permanent_name_identifier(student_data[:student_id])
        e_message = e_message + "<br/>#{student_data[:first_name]} #{student_data[:last_name]}, #{student_data[:student_id]}"
      end
      e_message = e_message + "<br/>Please create a unique ID for the above students."
      flash[:error] = e_message.html_safe
      redirect_to new_course_path and return
    end

    if course.save
      course.offer!
      course.save!
      add_teacher(course)
      add_students(student_hashes, course) if students_array.present?
      flash[:notice] = 'Class added'
      redirect_to new_course_path
    else
      flash[:error] = 'Could not add class'
      redirect_to new_course_path
    end
  end

  def destroy
    @course = Course.find(params[:id])
    @course.destroy
    redirect_to courses_path
  end

  def settings
    get_context
    if authorized_action(@context, @current_user, :read_as_admin)
      @alerts = @context.alerts
      @role_types = []
      add_crumb(t('#crumbs.settings', "Settings"), named_context_url(@context, :context_details_url))
    end
  end

  def teacher_root_path
    page_path = ""
    first_course = @current_user.courses.active.first
    if first_course.present?
      page_path = course_path(first_course)
    else
      page_path = new_course_path
    end
    page_path
  end

  def edit_course_students
    @course = Course.find(params[:course_id]) if params[:course_id]
  end

  def update_course_students
    @course = Course.find(params[:course_id]) if params[:course_id]
    course_students = params[:course_students]
    course_students.each do |student_data|
      student = User.find_by_permanent_name_identifier(student_data["permanent_name_identifier"])
      full_name = student_data["first_name"] + " " + student_data["last_name"]
      if student.name != full_name
        student.update_attribute(:name, full_name)
        student.save
      end
    end
    flash[:notice] = "Roster has been updated"
    redirect_to course_path(@course)
  end

  def add_student_to_course
    @course = Course.find(params[:course_id]) if params[:course_id]
    if params[:permanent_name_identifier] && params[:first_name]
      student = find_or_create_student(params[:first_name], params[:last_name], params[:permanent_name_identifier], (@course.students.map(&:short_name).sort.last.to_i + 1))
      enroll = @course.enroll_student(student)
      enroll.workflow_state = 'active'
      enroll.save!
      flash[:notice] = "#{params[:first_name]} #{params[:last_name]} added to course"
    else
      flash[:error] = "Student must have First Name and ID"
    end
    redirect_to course_path(@course)
  end

  def add_students_to_course
    @course = Course.find(params[:course_id]) if params[:course_id]
    name_order = params[:name_order]
    students_array = params[:students].split(/\r?\n/)

    if students_array.present? && !validate_students_array(students_array)
      flash[:error] = 'Student list not added correctly. Could not add students.'
      redirect_to course_path(@course)
    end

    student_hashes = build_student_hashes(students_array, name_order)
    existing_students = check_for_existing_students(student_hashes)

    if existing_students.present?
      e_message = "The following student school id(s) are already in use within the EM2 system:"
      existing_students.each do |student_data|
        user = User.find_by_permanent_name_identifier(student_data[:student_id])
        e_message = e_message + "<br/>#{student_data[:first_name]} #{student_data[:last_name]}, #{student_data[:student_id]}"
      end
      e_message = e_message + "<br/>Please create a unique ID for the above students."
      flash[:error] = e_message
      redirect_to new_course_path
    end

    add_students(student_hashes, course) if students_array.present?
    flash[:notice] = 'Students added'
    redirect_to course_path(@course)
  end

  def remove_student_from_course
    @course = Course.find(params[:course_id]) if params[:course_id]
    student_enrollment = @course.student_enrollments.find_by_user_id(params[:student_id])
    student_enrollment.delete
    redirect_to course_edit_course_students_path
  end

  private

  def generate_unique_course_identifier
    @school_id = @current_user.account.id.to_s
    while (@school_id.length < 3)
      @school_id.insert(0, '0')
    end
    @i = 101
    @unique_course_identifier = "D000S#{@school_id}T001C#{@i}"
    while Course.find_by_em2_identifier(@unique_course_identifier) != nil
      @i += 1
      @unique_course_identifier = "D000S#{@school_id}T001C#{@i}"
    end
    @unique_course_identifier
  end

  def add_students(student_hashes, course)
    student_hashes.each do |sd|
      student = find_or_create_student(sd[:first_name], sd[:last_name], sd[:student_id], sd[:course_enrollment_count])
      enroll = course.enroll_student(student)
      enroll.workflow_state = 'active'
      enroll.save!
    end
  end

  def build_student_hashes(students_array, name_order)
    array = []
    student_id_first = student_id_first?(students_array)
    students_array.count.times do
      course_enrollment_count = students_array.count
      student_data = students_array.pop.scan(/\w+/).join(" ").split
      if name_order == "last"
        if student_id_first
          first_name = student_data.count == 3 ? student_data.pop : ""
          last_name = student_data.pop
          student_id = student_data.pop
        else
          student_id = student_data.pop
          first_name = student_data.count == 2 ? student_data.pop : ""
          last_name = student_data.pop
        end
      else
        if student_id_first
          last_name = student_data.count == 3 ? student_data.pop : ""
          first_name = student_data.pop
          student_id = student_data.pop
        else
          student_id = student_data.pop
          last_name = student_data.count == 2 ? student_data.pop : ""
          first_name = student_data.pop
        end
      end
      array << {:first_name => first_name, :last_name => last_name, :student_id => student_id, :course_enrollment_count => course_enrollment_count}
    end
    array
  end

  def find_or_create_student(first_name, last_name, student_id, course_enrollment_count)
      @name = "#{first_name} #{last_name}"
      @student_id = student_id
      @sortable_name = last_name == "" ? @name : "#{last_name}, #{first_name}"
      find_student = User.find(:first, :conditions => ["name = ? AND permanent_name_identifier = ?", @name, @student_id] )
    if find_student.present?
      @student = find_student
    else
      @course_enrollment_count = course_enrollment_count

      #
      # Make sure student_id is unique
      @first_name_array = first_name.split("")
      while (Pseudonym.find_by_unique_id(@student_id) != nil)
        @student_id = @student_id + @first_name_array.shift.downcase
      end

      @student = User.create!
      @student_number = (@course_enrollment_count + 1).to_s

      #
      # the user should have a 4 digit number ie: 0001
      while (@student_number.length < 4)
        @student_number.insert(0, '0')
      end

      @student.name = @name
      @student.sortable_name = @sortable_name
      @student.permanent_name_identifier = @student_id
      @student.short_name = @student_number
      @student.browser_locale = 'en'

      #
      # pseudonym is what stores the users login information, let's build it
      @pseudonym = @student.pseudonyms.build(:account => @current_user.account)
      @pseudonym.user = @student
      @pseudonym.unique_id = @student_id
      @pseudonym.account = @current_user.account
      @pseudonym.workflow_state = 'active'

      @pseudonym.password = Canvas::Security.config["student_password"]
      @pseudonym.password_confirmation = Canvas::Security.config["student_password"]
      @pseudonym.save_without_session_maintenance

      @student.register!
      @student.save!
    end
    @student
  end

  def add_teacher(course)
    @course = course
    if (!@enroll = @course.enrollments.find_by_user_id(@current_user.id))
      @enroll=@course.enroll_teacher(@current_user)
    end
    @enroll.workflow_state = 'active'
    @enroll.save!
  end

  def validate_students_array(students_array)
    @valid = false
    students_array.each do |student|
      student.split.each do |word|
        @valid = true if word.scan(/\d/).present?
      end
      @valid = false if student.split.count <= 1
    end
    @valid
  end

  def student_id_first?(students_array)
    sample = students_array.first.split
    result = sample.first.scan(/\d/).present?
    result
  end

  def check_for_existing_students(student_hashes)
    array = []
    student_ids = User.all.map(&:permanent_name_identifier)

    student_hashes.each do |student_data|
      if student_ids.include?(student_data[:student_id])
        array << student_data
      end
    end

    array
  end

end
