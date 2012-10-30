class AssessmentReportsController < ApplicationController
  def index
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

      # add_crumb("Reports")

      is_admin?
      is_teacher?

      if !@report = Report.find_by_account_id(@context.id)
        @report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end

      @question_bank = AssessmentQuestionBank.active
      
    else
      redirect_back_or_default(dashboard_url)
    end
  end

  def show
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?

	    @current_probe = AssessmentQuestionBank.find(params[:id])
	    

	    if params[:district_report_id]
			  load_district_data
		  elsif params[:school_report_id]
		  	load_school_data
		  elsif params[:class_report_id]
		  	load_class_data
		  end

	    
	    
		else
			redirect_back_or_default(dashboard_url)
		end
  end

  def load_district_data

  	if !@is_admin
      redirect_back_or_default(dashboard_url)
    end

  	@account = Account.find(params[:district_report_id])

  	# add_crumb("Reports", reports_path)
    # add_crumb(@current_probe.title, report_path(params[:report_id]))
    # add_crumb("Districts", report_district_reports_path(params[:report_id]))
    # add_crumb(@account.name)
    

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

    # add_crumb("Reports", reports_path)
    # add_crumb(@current_probe.title, report_path(params[:report_id]))
    # add_crumb("Schools", report_school_reports_path(params[:report_id]))
    # add_crumb(@account.parent_account.name + @account.name)

    if data = SchoolReport.find_by_account_id_and_probe_id(@account.id, @current_probe.id)
      @quiz_question_count = data.quiz_question_count
      @report_name = data.report_name
      @participating_students_count = data.participating_students_count
      @participating_class_count = data.participating_class_count
      @course_ids = JSON.parse(data.course_ids)
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
    else
      flash[:error] = "This report is not yet ready."
      redirect_back_or_default(school_report_assessment_reports_path(@account.id))
    end

  end

  def load_class_data

		is_teacher?
    if !@is_admin && !@is_teacher
			redirect_back_or_default(dashboard_url)
		end

  	@course = Course.find(params[:class_report_id])

    # add_crumb("Reports", reports_path)
    # add_crumb(@current_probe.title, report_path(params[:report_id]))
    # add_crumb("Classes", report_class_reports_path(params[:report_id]))
    # add_crumb(@course.name)

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
        @user_misconceptions = JSON.parse(data.user_misconceptions)
        @misconceptions = @quiz.quiz_misconceptions.active
        @total_user_misconceptions = JSON.parse(data.total_user_misconceptions)
        @earliest_submission = data.earliest_submission
        @latest_submission = data.latest_submission 
      else
        flash[:error] = "This report is not yet ready."
        redirect_back_or_default(class_report_assessment_reports_path(@account.id))
      end
    end

  end

end
