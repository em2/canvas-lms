class SchoolReportsController < ApplicationController
  before_filter :require_user
  
  def index
  	if is_authorized?(@current_user) && redirect_if_not_admin_or_teacher# Make sure the user is authorized to do this

      if !@is_admin
        redirect_back_or_default(dashboard_url)
      end

	    add_crumb("Reports", reports_path)
      add_crumb("School Reports")

      @schools = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          @schools << sub_sub_account
        end
      end
		end
  end

end
