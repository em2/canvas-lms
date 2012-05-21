
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
      @params = {:rosters => {:probe_id => question_bank.id, :stage => "X", :instance => "001", :students => "25", :courses => "D001S001T001C001"}}
    end
    
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

    it "should not allow the stage to be empty(nil)" do
      @params[:rosters][:stage] = nil
      post 'create', @params
      flash[:error].should == "Please complete the form."
    end

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

end
