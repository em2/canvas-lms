require File.expand_path(File.dirname(__FILE__) + '/../spec_helper.rb')

describe Roster do
	before(:each) do
		@context = @domain_root_account || Account.default unless @context.is_a?(Account)
		@question_bank = AssessmentQuestionBank.new
		@question_bank.title = "CF_A_01"
		@question_bank.full_name = "Comparing Fractions"
		@question_bank.workflow_state = "active"
		@question_bank.save!
		account_admin_user(:username => "admin")
		@course_title = "D001S001T001C001"
		@district = "D001"
		@school = "S001"
		@teacher = "T001"
		@instance = "001"
		@stage = "X"
		@number_students = 1
		@district_account = Account.create!(:name => @district, :parent_account => @context)
		@school_account = Account.create!(:name => @school, :parent_account => @district_account)
		@valid_attributes = {
			:context => @context,
			:probe => @question_bank,
			:instance => @instance,
			:stage => @stage,
			:course_title => @course_title,
			:current_user => @user,
			:number_students => @number_students,
			:district => @district,
			:district_account => @district_account,
			:school_account => @school_account,
			:teacher => @teacher
		}
	end



	it "should create a new instance given valid attributes" do
		roster = Roster.new
		roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
	end

	describe "create courses" do
		it "should not create duplicate course names for the same teacher in the same school" do
			number_courses_before = Course.all.count
			roster = Roster.new
			@course_title = "D001S001T001C001"
			roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			@course_title = "D001S002T001C001"
			roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			@course_title = "D001S001T001C001"
			roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			number_courses_after = Course.all.count
			(number_courses_after - number_courses_before).should == 2
		end
	end
end
