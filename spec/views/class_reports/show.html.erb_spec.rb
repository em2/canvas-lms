require 'spec_helper'

describe "/class_reports/show" do
  before(:each) do
    render 'class_reports/show'
  end

  #Delete this example and add some real ones or delete this file
  it "should tell you where to find the file" do
    response.should have_tag('p', %r[Find me in app/views/class_reports/show])
  end
end
