class DistrictReportsController < ApplicationController
  before_filter :require_user

  def index
    if is_authorized?(@current_user) && is_admin_or_teacher?# Make sure the user is authorized to do this

      if !@is_admin
        redirect_back_or_default(dashboard_url)
      end

      add_crumb("Reports", reports_path)
      add_crumb("District Reports")

      @districts = {}

      @context.sub_accounts.active.each do |sub_account|
        @probes = []
        find_probes_in_account(sub_account, sub_account, AssessmentQuestionBank.active, @probes)
        @districts[sub_account] = @probes unless sub_account.name.include?("Manually-Created Classes") || sub_account.name.include?("Manually-Created Courses")
      end

      @context = prepare_for_report
      @active_tab = "reports"
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end
  end

end
