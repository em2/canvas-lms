
require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe RostersController do
  integrate_views

  describe "GET 'index'" do
    it "should not allow students to view the rosters" do
      user()
      user_session(@user)
      get 'index'
      response.status.should == '401 Unauthorized'
    end

    it "should have the right title" do
      account_admin_user(:username => "admin")
      user_session(@admin)
      get 'index'
      response.should have_tag("title", "School Rosters")
    end
  end

  describe "POST 'create'" do
    before(:each) do
      account_admin_user(:username => "admin")
      user_session(@admin)

      question_bank = AssessmentQuestionBank.new
      question_bank.title = "CF_A_01"
      question_bank.full_name = "Comparing Fractions"
      question_bank.workflow_state = "active"
      question_bank.save!
      @params = {:rosters => {:probe_id => question_bank.id, :stage => "X", :instance => "001", :students => "1", :courses => "D001S001T001C001"}}
    end
    describe "allow only certain users to create rosters" do
      it "should not allow students to create rosters" do
        user()
        user_session(@user)
        post 'create', @params
        response.status.should == '401 Unauthorized'
      end

      it "should allow admins to create rosters" do
        post 'create', @params
        flash[:notice].should match(/Attempting to generate the probes.../)
      end
    end

    describe "check stage is valid" do
      it "should not allow the stage to be empty(nil)" do
        @params[:rosters][:stage] = nil
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end
    end

    describe "check instance is valid" do
      it "should not allow the instance to be empty(nil)" do
        @params[:rosters][:instance] = nil
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end

      it "should not allow the instance to include letters" do
        @params[:rosters][:instance] = "a01"
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end

      it "should not allow the instance to be larger than 3 numbers" do
        @params[:rosters][:instance] = "1001"
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end

      it "should not allow the instance to be smaller than 3 numbers" do
        @params[:rosters][:instance] = "11"
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end
    end

    describe "check custom student count is valid" do
      it "should not allow the custom student count to be empty(nil)" do
        @params[:rosters][:students] = "Other"
        @params[:rosters][:students_custom] = nil
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end

      it "should not allow the custom student count to be less than 1" do
        @params[:rosters][:students] = "Other"
        @params[:rosters][:students_custom] = "0"
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end

      it "should not allow the custom student count to be greater than 250" do
        @params[:rosters][:students] = "Other"
        @params[:rosters][:students_custom] = "251"
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end

      it "should not allow the custom student count to include letters" do
        @params[:rosters][:students] = "Other"
        @params[:rosters][:students_custom] = "a25"
        post 'create', @params
        flash[:error].should == "Please complete the form."
      end
    end

    describe "check course codes are valid" do
      it "should capitalize all letters in the course_title" do
        @params[:rosters][:courses] = "d002s002t002c002"
        post 'create', @params
        course = Course.last
        course.name.should == "D002S002T002C002"
      end

      it "should alert that no probes were created if there was only one probe to be created and the course title is too long" do
        @params[:rosters][:courses] = "D0001S0001T0001C0001"
        post 'create', @params
        flash[:error].should == "There were some errors and no probes have been generated."
      end

      it "should alert that no probes were created if there was only one probe to be created and the course title is too short" do
        @params[:rosters][:courses] = "D01S01T01C01"
        post 'create', @params
        flash[:error].should == "There were some errors and no probes have been generated."
      end

      it "should alert that no probes were created if there was only one probe to be created and the course title format is incorrect" do
        @params[:rosters][:courses] = "D001S001C001T001"
        post 'create', @params
        flash[:error].should == "There were some errors and no probes have been generated."
      end

      it "should alert that some probes were created if there was a problem with some of the courses to be created and their course title format is too long" do
        @params[:rosters][:courses] = "D001S001T001C001 D0001S0001T0001C0001"
        post 'create', @params
        flash[:error].should == "There were some errors. However, I am attempting to generate the probes..."
      end

      it "should alert that some probes were created if there was a problem with some of the courses to be created and their course title format is too short" do
        @params[:rosters][:courses] = "D001S001T001C001 D01S01T01C01"
        post 'create', @params
        flash[:error].should == "There were some errors. However, I am attempting to generate the probes..."
      end

      it "should alert that some probes were created if there was a problem with some of the courses to be created and their course title format is incorrect" do
        @params[:rosters][:courses] = "D001S001T001C001 D001S001c001t001"
        post 'create', @params
        flash[:error].should == "There were some errors. However, I am attempting to generate the probes..."
      end
    end

    describe "check multiple courses are created" do
      it "should create multiple courses if multiple course codes are entered separated by a space" do
        @params[:rosters][:courses] = "D001S001T001C001 D001S001T001C002 D001S001T001C003"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end

      it "should create multiple courses if multiple course codes are entered separated by a comma" do
        @params[:rosters][:courses] = "D001S001T001C001,D001S001T001C002,D001S001T001C003"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end

      it "should create multiple courses if multiple course codes are entered separated by a tab" do
        @params[:rosters][:courses] = "D001S001T001C001\tD001S001T001C002\tD001S001T001C003"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end

      it "should create multiple courses if multiple course codes are entered separated by a semicolon" do
        @params[:rosters][:courses] = "D001S001T001C001;D001S001T001C002;D001S001T001C003"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end

      it "should create multiple courses if multiple course codes are entered separated by a newline" do
        @params[:rosters][:courses] = "D001S001T001C001\nD001S001T001C002\nD001S001T001C003"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end

      it "should create multiple courses if multiple course codes are entered separated by a carriage return" do
        @params[:rosters][:courses] = "D001S001T001C001\rD001S001T001C002\rD001S001T001C003"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end

      it "should create multiple courses if multiple course codes are entered separated by mixtures of spaces, commas, etc" do
        @params[:rosters][:courses] = "D001S001T001C001 D001S001T001C002,D001S001T001C003;D001S001T001C004\tD001S001T001C005\rD001S001T001C006\nD001S001T001C007"
        post 'create', @params
        flash[:notice].should == "Attempting to generate the probes..."
      end
    end

    describe "create multiple districts/schools" do
      it "should not create duplicate districts" do
        @params[:rosters][:courses] = "D001S001T001C001 D001S001T001C002"
        post 'create', @params
        same_account_found = false
        Roster.all.each do |roster|
          district_name = roster.name[/[Dd][0-9]{3}/]
          district = Account.find_by_name(district_name)
          Account.all.each do |account|
            if (account.name == district_name && account != district)
              same_account_found = true
            end
          end
        end
        same_account_found.should == false
      end

      it "should not create duplicate schools in the same district" do
        @params[:rosters][:courses] = "D001S001T001C001 D002S001T001C002 D001S001T001C002"
        post 'create', @params
        same_account_found = false
        Roster.all.each do |roster|
          district_name = roster.name[/[Dd][0-9]{3}/]
          school_name = roster.name[/[Ss][0-9]{3}/]
          district = Account.find_by_name(district_name)
          school_account = Account.find_by_name(school_name)
          district.sub_accounts.each do |school|
            if (school != school_account && school.parent_account == school_account.parent_account && school.name == school_name && school.workflow_state == "active")
              same_account_found = true
            end
          end
        end
        same_account_found.should == false
      end
    end



  end

end
