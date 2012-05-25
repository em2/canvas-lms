require File.expand_path(File.dirname(__FILE__) + '/common')

describe "dashboard roster form" do
	before(:each) do
		# @question_bank = AssessmentQuestionBank.new
		# @question_bank.title = "CF_A_01"
		# @question_bank.full_name = "Comparing Fractions"
		# @question_bank.workflow_state = "active"
		# @question_bank.save!
		Account.default.update_attribute(:settings, { :teachers_can_create_courses => true, :students_can_create_courses => true })
    	@domain_root_account = Account.default
	end

	it_should_behave_like "in-process server selenium tests"

	context "as a student" do
		before (:each) do
			#user()
			#user_session(@user)
      		#user_logged_in
      		#course_with_student_logged_in(:active_all => true)
      		student_logged_in
    	end

    	it "should not allow a student to even see the form" do
    		get "/"
    		driver.find_elements(:css, 'h2').count.should be == 3
    	end
	end

	context "as a teacher" do
		before (:each) do
			#course_with_teacher_logged_in
      		#admin_logged_in
      		teacher_logged_in
    	end

    	it "should allow teachers to see the form" do
    		get "/"
    		driver.find_elements(:css, 'h2').count.should be == 5
    	end
	end


end