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
      add_crumb(@current_probe.title, report_path(params[:report_id]))
      add_crumb("Classes", report_class_reports_path(params[:report_id]))
      add_crumb(@course.name)

      @course.quizzes.active.each do |quiz|
      	if quiz.probe_name && quiz.probe_name[@current_probe.title]
      		@quiz = quiz
      	end
      end

      if @quiz && (@quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics))
  	    
        if data = ClassReport.find_by_course_id_and_probe_id_and_quiz_id(@course.id, @current_probe.id, @quiz.id)
          @q = JSON.parse(data.q)
          @number_correct = JSON.parse(data.number_correct)
          @number_attempted = JSON.parse(data.number_attempted)
          @percent_correct = JSON.parse(data.percent_correct)
          @item_analysis = JSON.parse(data.item_analysis)
          @teacher_id = data.teacher_id
          @teacher_name = data.teacher_name
          @course_name = data.course_name
          @school_name = data.school_name
          @submitted_students_count = data.submitted_students_count
          submitted_students_ids = JSON.parse(data.submitted_students_ids)
          @submitted_students = []
          submitted_students_ids.each do |id|
            @submitted_students << User.find(id)
          end
          @quiz_question_count = data.quiz_question_count
          @submissions = JSON.parse(data.submissions)
        else
          flash[:error] = "This report is not yet ready."
          redirect_back_or_default(report_class_reports_path(params[:report_id]))
        end
      else
        flash[:error] = "No Assessment Found"
        redirect_back_or_default(report_class_reports_path(params[:report_id]))
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
