require 'spec_helper'

describe "/students_reports/show" do
  before(:each) do
    render 'students_reports/show'
  end

  #Delete this example and add some real ones or delete this file
  it "should tell you where to find the file" do
    response.should have_tag('p', %r[Find me in app/views/students_reports/show])
  end
end
