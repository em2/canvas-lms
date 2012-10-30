class SchoolReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
      is_teacher?

	    # @current_probe = AssessmentQuestionBank.find(params[:report_id])

	    # add_crumb("Reports", reports_path)
     #  add_crumb(@current_probe.title, report_path(@current_probe.id))
     #  add_crumb("Schools")

	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end

      @schools = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          @schools << sub_sub_account
        end
      end

      # @context.sub_accounts.active.each do |sub_account|
      #   sub_account.sub_accounts.active.each do |sub_sub_account|
      #     @found_match = false
      #     find_courses_in_account(sub_sub_account, sub_sub_account, @current_probe, @schools)
      #   end
      # end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

end
