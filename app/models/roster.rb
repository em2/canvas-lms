class Roster < ActiveRecord::Base
	belongs_to :account
	named_scope :by_name, :order => 'name ASC'


	#########################################################################
	#
	# generate_probes will generate all the districts, schools, teachers, and students
	#
	#########################################################################
	def generate_probes(context, probe, instance, stage, course_title, current_user, num_students, district, district_account, school_account, teacher)
        

        #
        # Try to find the course. If unsuccessful, then create the Course.
        if (!@course = Course.find_by_name(course_title))
          @course = Course.create!(:name => course_title, :course_code => course_title, :account => school_account)
          @course.offer!
          @course.save!
        end
        

        #
        # Try to find the teacher
        # Go through each school and look for a teacher with the same name
        # if unsuccessful, go ahead and create that teacher
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
        
        #
        # If the teacher was not found, create that teacher
        if (!teacher_found)
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
        
        #
        # Enroll the teacher in this course as a teacher
        @enroll=@course.enroll_teacher(@teacher_account)
        @enroll.workflow_state = 'active'
        @enroll.save!
        
        #
        # Enroll the current user as the teacher
        if (!@course.enrollments.find_by_user_id(current_user.id))
          @enroll=@course.enroll_teacher(current_user)
          @enroll.workflow_state = 'active'
          @enroll.save!
        end
        
        
        #
        # Make sure that the stage instance has not been used with this probe
        assignment_found = false
        @course.assignments.each do |assignment|
          temp_probe_name = probe.title + stage + instance
          if (Quiz.find_by_assignment_id(assignment.id).probe_name == temp_probe_name)
            assignment_found = true
            errors_found = true
          end
        end
        
        
        if (!assignment_found)
          #
          # Create the Assessment
          @quiz = @course.quizzes.create
          @quiz.title = probe.full_name
          @quiz.probe_name = probe.title + stage + instance
          @quiz.description = nil
          @quiz.hide_results = 'always'
          @quiz.show_correct_answers = false
          @quiz.content_being_saved_by(current_user)
          @quiz.infer_times()
          @quiz.add_assessment_questions(probe.assessment_questions)
          @quiz.generate_quiz_data()
          @quiz.published_at = Time.now
          @quiz.workflow_state = 'available'
          @quiz.anonymous_submissions = false
          @quiz.save!
          
          @course_assignment = Assignment.find(@quiz.assignment_id)
          @course_assignment.position = @course.assignments.count
          @course_assignment.save!
        end
        
        #
        # Create the students
        srand
        # calculate the number of extra students needed
        # course student enrollments count minus the total required students
        @course_enrollment_count = @course.enrollments.all_student.count
        @num_needed = num_students - @course_enrollment_count
        
        j = 0
        while(j < num_students && j < @num_needed)
          
          @student_id = rand(8999999999)+1000000000
          #
          # Make sure student_id is unique
          while (Pseudonym.find_by_unique_id(@student_id) != nil)
            @student_id = rand(8999999999)+1000000000
          end
          @student = User.create!
          @student_number = (j + @course_enrollment_count + 1).to_s
          #
          # the the user have a 4 digit number ie: 0001
          while (@student_number.length < 4)
            @student_number.insert(0, '0')
          end
          
          @student.name = @student_id
          @student.sortable_name = course_title + @student_number
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
          
          @enroll = @course.enroll_student(@student)
          @enroll.workflow_state = 'active'
          @enroll.save!
          
          
          j += 1
        end
	end
end
