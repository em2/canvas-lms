require 'spec_helper'

describe "/district_reports/index" do
  before(:each) do
    render 'district_reports/index'
  end

  #Delete this example and add some real ones or delete this file
  it "should tell you where to find the file" do
    response.should have_tag('p', %r[Find me in app/views/district_reports/index])
  end
end
