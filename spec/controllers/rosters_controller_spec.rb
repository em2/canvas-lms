require 'spec_helper'

describe RostersController do

  #Delete these examples and add some real ones
  it "should use RostersController" do
    controller.should be_an_instance_of(RostersController)
  end


  describe "GET 'index'" do
    it "should be successful" do
      get 'index'
      response.should be_success
    end
  end

  describe "GET 'show'" do
    it "should be successful" do
      get 'show'
      response.should be_success
    end
  end

  describe "GET 'generate'" do
    it "should be successful" do
      get 'generate'
      response.should be_success
    end
  end
end
