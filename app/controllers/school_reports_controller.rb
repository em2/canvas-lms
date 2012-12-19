class SchoolReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) && authorized_action(@context, @current_user, :read) # Make sure the user is authorized to do this

	    is_admin?
      is_teacher?

	    add_crumb("Reports", reports_path)
      add_crumb("School Reports")

	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end

      @schools = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          @schools << sub_sub_account
        end
      end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

end
