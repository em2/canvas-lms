
require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe RostersController do
  integrate_views

  describe "GET 'index'" do
    it "should have the right title" do
      pending("todo")
      user()
      user_session(@user)
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


  end

end
