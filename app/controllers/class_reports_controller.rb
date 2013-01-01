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
    end
  end

end
