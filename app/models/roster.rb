class Roster < ActiveRecord::Base
	belongs_to :account

  validates_presence_of :name
  validates_length_of :name, :minimum => 8
  validates_length_of :name, :maximum => 8

  named_scope :by_name, {:conditions => {:workflow_state => 'available'}, :order => 'name ASC'}


	#########################################################################
	#
	# generate_probes will generate all the districts, schools, teachers, and students
	#
	#########################################################################
	def generate_probes(context, probe, instance, stage, course_title, current_user, number_students, district, district_account, school_account, teacher)

    #
    # Try to find the course. If unsuccessful, then create the Course.
    if (!find_course(course_title))
      create_course(course_title, school_account)
    end

    #
    # Try to find the teacher
    # Go through each district and look for a teacher with the same name
    # if unsuccessful, go ahead and create that teacher
    if (!find_teacher(district_account, district, teacher))
      create_teacher(context, district, teacher)
    end
        
    #
    # Enroll the teacher in this course as a teacher
    enroll_as_teacher(@teacher_account)
    
    #
    # Enroll the current user as the teacher
    enroll_as_teacher(current_user)
    
    #
    # Make sure that the stage instance has not been used with this probe
    # if not, create the assessment
    if (!find_assignment(probe, stage, instance))
      create_assignment(probe, stage, instance, current_user)
    end
        
    #
    # Create the students
    srand
    # calculate the number of extra students needed
    # course student enrollments count minus the total required students
    @course_enrollment_count = @course.enrollments.all_student_active.count
    @students_needed = number_students - @course_enrollment_count

    #
    # Loop until a student has been created for all the @students_needed
    i = 0
    while(i < @students_needed)
      create_student(context, course_title, i)
      enroll_as_student(@student)
      i += 1
    end
	end

  def find_course(course_title)
    course_found = false
    Course.all.each do |course|
      if (course.name == course_title)
        if (course.workflow_state == "available" || course.workflow_state == "completed")
          course_found = true
          @course = course
          if (course.workflow_state == "completed")
            @course.unconclude
            @course.save!
          end
        end 
      end
    end
    return course_found
  end

  def create_course(course_title, school_account)
    @course = Course.create!(:name => course_title, :course_code => course_title, :account => school_account, :em2_identifier => course_title)
    @course.offer!
    @course.save!
  end

  def find_teacher(district_account, district, teacher)
    teacher_found = false
    district_account.sub_accounts.each do |school|
      school.courses.each do |course|
        course.enrollments.all_admin.each do |admin|
          if (User.find(admin.user_id).sortable_name == district + teacher)
            teacher_found = true
            @teacher_account = User.find(admin.user_id)
          end
        end
      end
    end
    return teacher_found
  end

  def create_teacher(context, district, teacher)
    @teacher_id = rand(8999999999)+1000000000
    #
    # Make sure student_id is unique
    while (Pseudonym.find_by_unique_id(@teacher_id) != nil)
    @teacher_id = rand(8999999999)+1000000000
    end

    @teacher_account = User.create!
    @teacher_account.name = @teacher_id
    @teacher_account.sortable_name = district + teacher
    @teacher_account.short_name = district + teacher
    @teacher_account.permanent_name_identifier = district + teacher
    @teacher_account.browser_locale = 'en'

    #
    # pseudonym is what stores the users login information, let's build it
    @pseudonym = @teacher_account.pseudonyms.build(:account => context)
    @pseudonym.user = @teacher_account
    @pseudonym.unique_id = @teacher_id
    @pseudonym.account = context
    @pseudonym.workflow_state = 'active'
    @pseudonym.password = @teacher_id
    @pseudonym.password_confirmation = @teacher_id
    @pseudonym.save_without_session_maintenance

    @teacher_account.register!
    @teacher_account.save!
  end

  def create_student(context, course_title, i)
    @student_id = rand(8999999999)+1000000000
    
    #
    # Make sure student_id is unique
    while (Pseudonym.find_by_unique_id(@student_id) != nil)
      @student_id = rand(8999999999)+1000000000
    end

    @student = User.create!
    @student_number = (i + @course_enrollment_count + 1).to_s

    #
    # the user should have a 4 digit number ie: 0001
    while (@student_number.length < 4)
      @student_number.insert(0, '0')
    end

    @student.name = @student_id
    @student.sortable_name = course_title + @student_number
    @student.permanent_name_identifier = course_title + @student_number
    @student.short_name = @student_number
    @student.browser_locale = 'en'

    #
    # pseudonym is what stores the users login information, let's build it
    @pseudonym = @student.pseudonyms.build(:account => context)
    @pseudonym.user = @student
    @pseudonym.unique_id = @student_id
    @pseudonym.account = context
    @pseudonym.workflow_state = 'active'

    @pseudonym.password = Canvas::Security.config["student_password"]
    @pseudonym.password_confirmation = Canvas::Security.config["student_password"]
    @pseudonym.save_without_session_maintenance

    @student.register!
    @student.save!
    
  end

  def enroll_as_teacher(user)
    if (!@enroll = @course.enrollments.find_by_user_id(user.id))
      @enroll=@course.enroll_teacher(user)
    end
    @enroll.workflow_state = 'active'
    @enroll.save!
  end

  def enroll_as_student(user)
    @enroll = @course.enroll_student(user)
    @enroll.workflow_state = 'active'
    @enroll.save!
  end

  def find_assignment(probe, stage, instance)
    assignment_found = false
    @course.assignments.each do |assignment|
      temp_probe_name = probe.title + stage + instance
      if (Quiz.find_by_assignment_id(assignment.id).probe_name == temp_probe_name)
        assignment_found = true
      end
    end
    return assignment_found
  end

  def create_assignment(probe, stage, instance, current_user)
    @quiz = @course.quizzes.create
    @quiz.title = probe.full_name
    @quiz.question_bank_id = probe.id
    @quiz.probe_name = probe.title + stage + instance
    @quiz.description = nil
    @quiz.hide_results = 'always'
    @quiz.show_correct_answers = false
    @quiz.content_being_saved_by(current_user)
    @quiz.infer_times()
    @quiz.add_assessment_questions(probe.assessment_questions.active)
    @quiz.generate_quiz_data(:update_misconception_ids => true)
    @quiz.published_at = Time.now
    @quiz.workflow_state = 'available'
    @quiz.anonymous_submissions = false
    @quiz.save!
    
    @course_assignment = Assignment.find(@quiz.assignment_id)
    @course_assignment.position = @course.assignments.count
    @course_assignment.save!
  end

  TAB_COURSES = 0
  TAB_REPORTS = 1
  TAB_ROSTERS = 2

  def self.default_tabs
    [
      { :id => TAB_COURSES, :label => t('#account.tab_courses', "Courses"), :css_class => 'courses', :href => :courses_path, :no_args => true },
      { :id => TAB_REPORTS, :label => t('#tabs.summary_reports', "Summary Reports"), :css_class => 'reports', :href => :reports_path, :no_args => true },
      { :id => TAB_ROSTERS, :label => t('#tabs.rosters', "Rosters"), :css_class => 'rosters', :href => :rosters_path, :no_args => true }
    ]
  end

  def tabs_available(user=nil, opts={})
    tabs = []
    tabs += Roster.default_tabs
    tabs
  end
  memoize :tabs_available
end