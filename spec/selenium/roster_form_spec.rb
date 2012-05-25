require File.expand_path(File.dirname(__FILE__) + '/common')

describe "dashboard roster form" do
	before(:each) do
		Account.default.update_attribute(:settings, { :teachers_can_create_courses => true })
    	@domain_root_account = Account.default
	end

	it_should_behave_like "in-process server selenium tests"

	context "as a student" do
		before (:each) do
      		@enrollment = course_with_student_logged_in(:active_all => true)
      		@course = @enrollment.course
      		create_assignment(@user)
      		#command = "GRANT ALL PRIVILEGES on canvas_test.* TO 'root'@'%';GRANT ALL PRIVILEGES on canvas_queue_test.* TO 'root'@'%';Flush Privileges;"
      		#system("mysql -u root -e \"#{command}\"")
    	end

    	it "should not allow a student to even see the form" do
    		get "/"
    		driver.find_elements(:css, 'h2').count.should be == 3
    	end

    	it "should redirect the student to the active assignment" do
    	end
	end

	context "as a teacher" do
		before (:each) do
			@enrollment = course_with_teacher_logged_in(:active_all => true)
			@course = @enrollment.course
			create_assignment(@user)
    	end

    	it "should allow teachers to see the form" do
    		get "/"
    		driver.find_elements(:css, 'h2').count.should be == 5
    	end
	end

	def create_quiz_template
		@question_bank = AssessmentQuestionBank.new
		@question_bank.title = "CF_A_01"
		@question_bank.full_name = "Comparing Fractions"
		@question_bank.workflow_state = "active"
		@question_bank.save!
	end

	def create_assignment(current_user)
		create_quiz_template()
	    @quiz = @course.quizzes.create
	    @quiz.title = @question_bank.full_name
	    @quiz.probe_name = @question_bank.title
	    @quiz.description = nil
	    @quiz.hide_results = 'always'
	    @quiz.show_correct_answers = false
	    @quiz.content_being_saved_by(current_user)
	    @quiz.infer_times()
	    @quiz.add_assessment_questions(@question_bank.assessment_questions)
	    @quiz.generate_quiz_data()
	    @quiz.published_at = Time.now
	    @quiz.workflow_state = 'available'
	    @quiz.anonymous_submissions = false
	    @quiz.save!
	    
	    @course_assignment = Assignment.find(@quiz.assignment_id)
	    @course_assignment.position = @course.assignments.count
	    @course_assignment.save!
	end

end