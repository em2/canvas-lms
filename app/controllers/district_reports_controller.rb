class DistrictReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Districts")

	    if !@is_admin
				redirect_back_or_default(dashboard_url)
			end

      @districts = []

      @context.sub_accounts.active.each do |sub_account|
        @account = sub_account
        @found_match = false
        find_courses(sub_account)
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
      add_crumb("Districts", report_district_reports_path)
      add_crumb(@account.name)


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

  def find_courses(account)
    if !account.courses.are_available.empty? && !@found_match
      account.courses.are_available.each do |course|
        course.quizzes.active.each do |quiz|
          if quiz.probe_name && quiz.probe_name[@current_probe.title]
            @found_match = true
            @districts << @account
          end
          if @found_match
            return true
          end
        end
        if @found_match
          return true
        end
      end
      if @found_match
        return true
      end
    end

    if !account.sub_accounts.active.empty? && !@found_match
      account.sub_accounts.active.each do |sub_account|
        find_courses(sub_account)
      end
    end
  end

end
