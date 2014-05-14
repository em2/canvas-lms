class CoursesController < ApplicationController


  def index
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
    course = Course.new(:name => params['course']['name'], :account => @current_user.account, :course_code => params['course']['name'], :em2_identifier => course_identifier)
    students_array = params['course']['students'].scan(/\w+/)
    if students_array.count % 3 == 0 && students_array.count > 0 && course.save
      course.offer!
      course.save!
      add_teacher(course)
      add_students(students_array, course)
      flash[:notice] = 'Class added'
      redirect_to new_course_path
    else
      flash[:error] = 'Could not add class'
      redirect_to new_course_path
    end
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

  def add_students(students_array, course)
    (students_array.count / 3).times do
      course_enrollment_count = students_array.count / 3
      student_id = students_array.pop
      last_name = students_array.pop
      first_name = students_array.pop
      student = find_or_create_student(first_name, last_name, student_id, course_enrollment_count)
      enroll = course.enroll_student(student)
      enroll.workflow_state = 'active'
      enroll.save!
    end
  end

  def find_or_create_student(first_name, last_name, student_id, course_enrollment_count)
      @name = "#{first_name} #{last_name}"
      @student_id = student_id
      @sortable_name = "#{last_name}, #{first_name}"
    if User.all(:conditions => "name = '#{@name}' AND permanent_name_identifier = '#{@student_id}'").present?
      @student = User.all(:conditions => "name = '#{@name}' AND permanent_name_identifier = '#{@student_id}'").first
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
end
