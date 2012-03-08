require 'spec_helper'

describe "/assessments/generate" do
  before(:each) do
    render 'assessments/generate'
  end

  #Delete this example and add some real ones or delete this file
  it "should tell you where to find the file" do
    response.should have_tag('p', %r[Find me in app/views/assessments/generate])
  end
end
