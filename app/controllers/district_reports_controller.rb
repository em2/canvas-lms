class DistrictReportsController < ApplicationController
  before_filter :require_user
  
  def index
  	if is_authorized?(@current_user) && is_admin_or_teacher?# Make sure the user is authorized to do this

      if !@is_admin
        redirect_back_or_default(dashboard_url)
      end

	    add_crumb("Reports", reports_path)
      add_crumb("District Reports")

      @districts = @context.sub_accounts.active

		end
  end

end
