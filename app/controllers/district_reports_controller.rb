class DistrictReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
      is_teacher?

	    add_crumb("Reports", reports_path)
      add_crumb("District Reports")

	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end

      @districts = @context.sub_accounts.active

		else
			redirect_back_or_default(dashboard_url)
		end
  end

end
