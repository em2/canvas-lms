class ClassReportsController < ApplicationController
  before_filter :require_user
  
  def index
  	if is_authorized?(@current_user) && is_admin_or_teacher?# Make sure the user is authorized to do this

	    add_crumb("Reports", reports_path)
      add_crumb("Class Reports")

      @classes = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          find_courses(sub_sub_account, sub_sub_account, @classes)
        end
      end

      if @is_teacher && !@is_admin
        @classes = find_courses_for_teacher(@classes)
      end

      if !@report = Report.find_by_account_id(@context.id)
        @report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end

      @context = @report
      @active_tab = "reports"
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end
  end

end
