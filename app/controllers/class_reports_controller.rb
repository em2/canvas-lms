class ClassReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
	    is_teacher?

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Classes")

	    if !@is_admin && !@is_teacher
				redirect_back_or_default(dashboard_url)
			end

      @classes = []

      @context.sub_accounts.active.each do |sub_account|
        sub_account.sub_accounts.active.each do |sub_sub_account|
          find_courses(sub_sub_account, sub_sub_account, @current_probe, @classes)
        end
      end

      if @is_teacher && !@is_admin
        @classes = find_courses_for_teacher(@classes)
      end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

  def show
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
	    is_teacher?
	    if !@is_admin && !@is_teacher
				redirect_back_or_default(dashboard_url)
			end

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])
	    @course = Course.find(params[:id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Classes", report_class_reports_path)
      add_crumb(@course.name)


      @course.quizzes.active.each do |quiz|
      	if quiz.probe_name[@current_probe.title]
      		@quiz = quiz
      	end
      end

      managed_quiz_data if @quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics)
	    
     #  if @quiz
	    #   @statistics = @quiz.statistics(params[:all_versions] == '1')
	    #   user_ids = @quiz.quiz_submissions.select{|s| !s.settings_only? }.map(&:user_id)
	    #   @submitted_users = user_ids.empty? ? [] : User.find_all_by_id(user_ids).compact.uniq.sort_by(&:last_name_first)
	    # end

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

  def managed_quiz_data
    @submissions = @quiz.quiz_submissions.select{|s| !s.settings_only? }
    submission_ids = {}
    @submissions.each{|s| submission_ids[s.user_id] = s.id }
    submission_users = @submissions.map{|s| s.user_id}
    students = @course.students.find(:all, :order => User.sortable_name_order_by_clause).to_a
    @submitted_students = students.select{|stu| submission_ids[stu.id] }
    if @quiz.survey? && @quiz.anonymous_submissions
      @submitted_students = @submitted_students.sort_by{|stu| submission_ids[stu.id] }
    end
    @unsubmitted_students = students.reject{|stu| submission_ids[stu.id] }
  end
  protected :managed_quiz_data

end
