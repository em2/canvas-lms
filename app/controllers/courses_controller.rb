class CoursesController < ApplicationController

  def index
    respond_to do |format|
      format.html {
        @current_enrollments = @current_user.cached_current_enrollments(:include_enrollment_uuid => session[:enrollment_uuid]).sort_by{|e| [e.active? ? 1 : 0, e.long_name] }
        @past_enrollments = @current_user.enrollments.ended.scoped(:conditions=>"enrollments.workflow_state NOT IN ('invited', 'deleted')")
        @past_enrollments.concat(@current_enrollments.select { |e| e.state_based_on_date == :completed })
        @current_enrollments.reject! { |e| [:inactive, :completed].include?(e.state_based_on_date) }
      }
      format.json {
        enrollments = @current_user.cached_current_enrollments
        if params[:enrollment_type]
          e_type = "#{params[:enrollment_type].capitalize}Enrollment"
          enrollments = enrollments.reject { |e| e.class.name != e_type }
        end

        includes = Set.new(Array(params[:include]))

        hash = []
        enrollments.group_by(&:course_id).each do |course_id, course_enrollments|
          course = course_enrollments.first.course
          hash << course_json(course, @current_user, session, includes, course_enrollments)
        end
        render :json => hash.to_json
      }
      report = Report.first
      @context = report unless report.nil?
    end
  end

  def show
    @course = Course.find(params[:id]) if params[:id]
  end
end
