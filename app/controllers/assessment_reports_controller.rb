class AssessmentReportsController < ApplicationController
  before_filter :require_user

  def index
  	if is_authorized?(@current_user) && is_admin_or_teacher?# Make sure the user is authorized to do this

      add_crumb("Reports", reports_path)

      @context = prepare_for_report
      @active_tab = "reports"

      @quizzes = []

      if params[:district_report_id]
			  load_district_probes
		  elsif params[:school_report_id]
		  	load_school_probes
		  elsif params[:class_report_id]
		  	load_class_probes
		  end
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end
  end

  def load_district_probes
  	@account = Account.find(params[:district_report_id])

    add_crumb("District Reports", district_reports_path)
    add_crumb("#{@account.name}")

  	@account.sub_accounts.active.each do |sub_account|
  		find_probes_in_account(sub_account, sub_account, AssessmentQuestionBank.active, @quizzes)
  	end
  end

  def load_school_probes
  	@account = Account.find(params[:school_report_id])

    add_crumb("School Reports", school_reports_path)
    add_crumb("#{@account.name}")
 
  	find_probes_in_account(@account, @account, AssessmentQuestionBank.active, @quizzes)
  end

  def load_class_probes
  	@course = Course.find(params[:class_report_id])

    add_crumb("Class Reports", class_reports_path)
    add_crumb("#{@course.name}")

    find_quizzes_in_course(@course, @quizzes)
  end

  def show
  	if is_authorized?(@current_user) && is_admin_or_teacher?# Make sure the user is authorized to do this
      
      add_crumb("Reports", reports_path)	    

	    if params[:district_report_id]
        @current_probe = AssessmentQuestionBank.find(params[:id])
			  load_district_data
		  elsif params[:school_report_id]
        @current_probe = AssessmentQuestionBank.find(params[:id])
		  	load_school_data
		  elsif params[:class_report_id]
        @quiz = Quiz.find(params[:id])
		  	load_class_data
		  end

      @context = prepare_for_report
      @active_tab = "reports"
	    
		else
      flash[:error] = "Not Authorized!"
			redirect_back_or_default(dashboard_url)
		end
  end

  def load_district_data

  	if !@is_admin
      redirect_back_or_default(dashboard_url)
    end

  	@account = Account.find(params[:district_report_id])

    add_crumb("District Reports", district_reports_path)
    add_crumb("#{@account.name}", district_report_assessment_reports_path)
    add_crumb("#{@current_probe.title}")
    

    if data = DistrictReport.find_by_account_id_and_probe_id(@account.id, @current_probe.id)
      @quiz_question_count = data.quiz_question_count
      @report_name = data.report_name
      @participating_students_count = data.participating_students_count
      @participating_class_count = data.participating_class_count
      @account_ids = JSON.parse(data.account_ids)
      @submitted_students_count = JSON.parse(data.submitted_students_count)
      @item_analysis = JSON.parse(data.item_analysis)
      @analysis = JSON.parse(data.analysis)
      @teachers_count = JSON.parse(data.teachers_count)
      @total_teachers_count = data.total_teachers_count
      @school_misconceptions = JSON.parse(data.school_misconceptions)
      @total_school_misconceptions = JSON.parse(data.total_school_misconceptions)
      probe = AssessmentQuestionBank.find(data.probe_id)
      @misconceptions = probe.assessment_misconceptions.active
      @earliest_submission = data.earliest_submission
      @latest_submission = data.latest_submission
      @school_difficulties = JSON.parse(data.school_difficulties)
      @total_school_difficulties = data.total_school_difficulties
    else
      flash[:error] = "This report is not yet ready."
      redirect_back_or_default(district_report_assessment_reports_path(@account.id))
    end
  end

  def load_school_data

  	if !@is_admin
      redirect_back_or_default(dashboard_url)
    end

    @account = Account.find(params[:school_report_id])
    
    add_crumb("School Reports", school_reports_path)
    add_crumb("#{@account.name}", school_report_assessment_reports_path)
    add_crumb("#{@current_probe.title}")

    if data = SchoolReport.find_by_account_id_and_probe_id(@account.id, @current_probe.id)
      @quiz_question_count = data.quiz_question_count
      @report_name = data.report_name
      @participating_students_count = data.participating_students_count
      @participating_class_count = data.participating_class_count
      @course_ids = JSON.parse(data.course_ids)
      @quiz_ids = JSON.parse(data.quiz_ids)
      @teacher_name = JSON.parse(data.teacher_name)
      @submitted_students_count = JSON.parse(data.submitted_students_count)
      @item_analysis = JSON.parse(data.item_analysis)
      @school_name = data.school_name
      @analysis = JSON.parse(data.analysis)
      @class_misconceptions = JSON.parse(data.class_misconceptions)
      @total_class_misconceptions = JSON.parse(data.total_class_misconceptions)
      probe = AssessmentQuestionBank.find(data.probe_id)
      @misconceptions = probe.assessment_misconceptions.active
      @earliest_submission = data.earliest_submission
      @latest_submission = data.latest_submission
      @class_difficulties = JSON.parse(data.class_difficulties)
      @total_class_difficulties = data.total_class_difficulties
    else
      flash[:error] = "This report is not yet ready."
      redirect_back_or_default(school_report_assessment_reports_path(@account.id))
    end
  end

  def load_class_data

  	@course = Course.find(params[:class_report_id])

    add_crumb("Class Reports", class_reports_path)
    add_crumb("#{@course.name}", class_report_assessment_reports_path)
    add_crumb("#{@quiz.title}")

    if @quiz && (@quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics))
	    
      if data = ClassReport.find_by_course_id_and_quiz_id(@course.id, @quiz.id)
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
        @user_misconceptions = JSON.parse(data.user_misconceptions)
        @misconceptions = @quiz.quiz_misconceptions.active
        @total_user_misconceptions = JSON.parse(data.total_user_misconceptions)
        @earliest_submission = data.earliest_submission
        @latest_submission = data.latest_submission
        @user_difficulties = JSON.parse(data.user_difficulties)
        @total_user_difficulties = data.total_user_difficulties
        @correct_answers = JSON.parse(data.correct_answers)
      else
        flash[:error] = "This report is not yet ready."
        redirect_back_or_default(class_report_assessment_reports_path(@course.id))
      end
    end
  end

end
