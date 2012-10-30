class ClassReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
	    is_teacher?

	    add_crumb("Reports", reports_path)
      add_crumb("Class Reports")

	    if !@is_admin && !@is_teacher
				redirect_back_or_default(dashboard_url)
			end

      @classes = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          find_courses(sub_sub_account, sub_sub_account, @classes)
        end
      end

      if @is_teacher && !@is_admin
        @classes = find_courses_for_teacher(@classes)
      end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

end
