class DistrictReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Districts")

	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end

      @districts = []

      @context.sub_accounts.active.each do |sub_account|
        @found_match = false
        find_courses_in_account(sub_account, sub_account, @current_probe, @districts)
      end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

  def show
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
      if !@is_admin
        redirect_back_or_default(dashboard_url)
      end

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])
	    @account = Account.find(params[:id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(params[:report_id]))
      add_crumb("Districts", report_district_reports_path(params[:report_id]))
      add_crumb(@account.name)

      if data = DistrictReport.find_by_account_id_and_probe_id(@account.id, @current_probe.id)
        @quiz_question_count = data.quiz_question_count
        @report_name = data.report_name
        @participating_students_count = data.participating_students_count
        @participating_class_count = data.participating_class_count
        @account_ids = JSON.parse(data.account_ids)
        @submitted_students_count = JSON.parse(data.submitted_students_count)
        @item_analysis = JSON.parse(data.item_analysis)
        @analysis = JSON.parse(data.analysis)
        @teachers_count = JSON.parse(data.teachers_count)
        @total_teachers_count = data.total_teachers_count
        @school_misconceptions = JSON.parse(data.school_misconceptions)
        @total_school_misconceptions = JSON.parse(data.total_school_misconceptions)
        probe = AssessmentQuestionBank.find(data.probe_id)
        @misconceptions = probe.assessment_misconceptions.active
      else
        flash[:error] = "This report is not yet ready."
        redirect_back_or_default(report_district_reports_path(params[:report_id]))
      end
	    
		else
			redirect_back_or_default(dashboard_url)
		end
  end

end
