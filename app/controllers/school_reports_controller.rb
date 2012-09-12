class SchoolReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Schools")

	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end

      @schools = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          @found_match = false
          find_courses(sub_sub_account, sub_sub_account, @current_probe, @schools)
        end
      end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

  def show
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])
	    @account = Account.find(params[:id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Schools", report_school_reports_path)
      add_crumb(@account.parent_account.name + @account.name)


	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end
		else
			redirect_back_or_default(dashboard_url)
		end
  end

  def is_authorized?(user)
    #
    # get the current context
    get_context
    @context = @domain_root_account || Account.default unless @context.is_a?(Account)
    @context = @context.root_account || @context

    #
    # Make sure the user is authorized to do this
    @domain_root_account.manually_created_courses_account.grants_rights?(user, session, :create_courses, :manage_courses).values.any?
  end

end
