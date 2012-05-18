
require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe RostersController do
  integrate_views

  def account_with_admin_logged_in(opts = {})
    @account = Account.default
    account_admin_user
    user_session(@admin)
  end


  describe "GET 'index'" do
    it "should have the right title" do
      
      get 'index'
      response.should have_tag("title", "School Rosters")
    end
  end

  context "POST 'create'" do
    before(:each) do
      params = {:rosters => {:probe => "CF_A_01", :stage => "X", :instance => "001", :students => "25", :courses => "D001S001T001C001"}}
    end
    it "should not allow students to create rosters" do
      post 'create'
      response.should_not be_success
    end

  end

end
