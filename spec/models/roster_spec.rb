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
		@roster = Roster.new
	end



	it "should create a new instance given valid attributes" do
		@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
	end

	describe "create courses" do
		it "should not create duplicate course names for the same teacher in the same school" do
			number_courses_before = Course.all.count
			@course_title = "D001S001T001C001"
			@district = "D001"
			@school = "S001"
			@teacher = "T001"
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			
			@course_title = "D001S002T001C001"
			@district = "D001"
			@school = "S002"
			@teacher = "T001"
			@backup_school_account = @school_account
			@school_account = Account.create!(:name => @school, :parent_account => @district_account)
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			
			@course_title = "D001S001T001C001"
			@district = "D001"
			@school = "S001"
			@teacher = "T001"
			@school_account = @backup_school_account
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			number_courses_after = Course.all.count
			(number_courses_after - number_courses_before).should be == 2
		end
	end

	describe "create teacher" do
		it "should duplicate the same teacher name in different districts" do
			number_users_before = User.all.count
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			
			@course_title = "D001S002T001C001"
			@district = "D002"
			@school = "S001"
			@teacher = "T001"
			@backup_district_account = @district_account
			@district_account = Account.create!(:name => @district, :parent_account => @context)
			@school_account = Account.create!(:name => @school, :parent_account => @district_account)
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			number_users_after = User.all.count
			(number_users_after - number_users_before).should be == 4 #two classes, one teacher and one student per class = 4
		end

		it "should not duplicate the same teacher name in the same district" do
			number_users_before = User.all.count
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			
			@course_title = "D001S002T001C001"
			@district = "D001"
			@school = "S002"
			@teacher = "T001"
			@backup_school_account = @school_account
			@school_account = Account.create!(:name => @school, :parent_account => @district_account)
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			number_users_after = User.all.count
			(number_users_after - number_users_before).should be == 3 #two classes, one teacher for both and one student per class = 3
		end
	end

	describe "enroll as teachers" do
		it "should enroll the created teacher in the class" do
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			teacher = User.find_by_sortable_name(@district + @teacher)
			course = Course.find_by_name(@course_title)

			teacher.enrollments.first.course_id.should be == course.id
		end

		it "should enroll the current_user as a teacher in the class" do
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)

			@user.enrollments.first.course_id.should be == course.id

		end
	end

	describe "create assignment" do
		it "should create an assignment for the class" do
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)

			course.assignments.first.context_id.should be == course.id
		end

		it "should not create duplicate assignments for the class" do 
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)
			course.assignments.count.should be == 1
		end
	end

	describe "create students" do
		it "should create students and enroll them in the course" do
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)
			course.students.count.should be > 0
		end

		it "should not create less or more students than specified" do
			@number_students = 2
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)
			course.students.count.should_not be < 2
			course.students.count.should_not be > 2
		end

		it "should create extra students when then total specified is more than the amount enrolled in the class" do
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			@number_students = 2
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)
			course.students.count.should be == 2
		end

		it "should give the students a short name of incrementing values" do
			@number_students = 2
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)
			course.students.all.each_with_index do |student, index|
				student.short_name.to_i.should be == index + 1
			end
		end

		it "should continue incrementing students short names instead of starting over at 0001 if more students are added to the class" do
			@number_students = 2
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			@number_students = 4
			@roster.generate_probes(@context, @question_bank, @instance, @stage, @course_title, @user, @number_students, @district, @district_account, @school_account, @teacher)
			course = Course.find_by_name(@course_title)
			course.students.all.each_with_index do |student, index|
				student.short_name.to_i.should be == index + 1
			end
		end
	end
end
