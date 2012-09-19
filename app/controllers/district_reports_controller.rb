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
        @found_match = false
        find_courses_in_account(sub_account, sub_account, @current_probe, @districts)
      end

		else
			redirect_back_or_default(dashboard_url)
		end
  end

  def show
  	if is_authorized?(@current_user) # Make sure the user is authorized to do this

	    is_admin?
      if !@is_admin
        redirect_back_or_default(dashboard_url)
      end

	    @current_probe = AssessmentQuestionBank.find(params[:report_id])
	    @account = Account.find(params[:id])

	    add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title, report_path(@current_probe.id))
      add_crumb("Districts", report_district_reports_path)
      add_crumb(@account.name)

      @data = {}
      @account.sub_accounts.active.each do |sub_account|
        sub_data = {}
        sub_account.courses.active.each do |course|
          course.quizzes.active.each do |quiz|
            if quiz.probe_name && quiz.probe_name[@current_probe.title]
              @quiz = quiz
            end
          end

          if @quiz && (@quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics))
            # managed_quiz_data(@quiz) if @quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics)
            
            sub_data[course.id] = gather_class_responses(course, @quiz)
          else
            flash[:error] = "No Assessment Found"
            redirect_back_or_default(report_school_reports_path(params[:report_id]))
          end
        end
        @data[sub_account.id] = sub_data
      end

      @total_students_count = 0
      @school_name = {}
      @data.each do |sub_account|
        if @school_name[sub_account.first] == nil
          @school_name[sub_account.first] = {}
        end
        @data[sub_account.first].each do |data|
          @total_students_count += @data[sub_account.first][data.first]["submitted_students_count"].to_i
          if @school_name[sub_account.first]["school_name"] == nil
            @school_name[sub_account.first]["school_name"] = @data[sub_account.first][data.first]['school_name']
          end
        end
      end
      

      @analysis = district_analysis(@data, @quiz_question_count)


      @data.each do |sub_account|
        @data[sub_account.first]["item_analysis"] = school_analysis(@data[sub_account.first], @quiz_question_count)
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

  def district_analysis(data, question_count)
    analysis = {}
    analysis["submitted_students_count"] = 0
    data.each do |sub_account|
      data[sub_account.first].each do |sub_data|
        if analysis["school_name"] == nil
          analysis["school_name"] = data[sub_account.first][sub_data.first]["course_name"][/S[0-9]{3}/]
        end
        question_count.times do |count|
          if analysis["#{count+1}"] == nil
            analysis["#{count+1}"] = data[sub_account.first][sub_data.first]["item_analysis"]["#{count+1}"]
          else
            analysis["#{count+1}"] += data[sub_account.first][sub_data.first]["item_analysis"]["#{count+1}"]
          end
        end

        analysis["submitted_students_count"] += data[sub_account.first][sub_data.first]["submitted_students_count"]
      
      end
    end

    question_count.times do |count|
      if data.count > 0
        analysis["#{count+1}"] = analysis["#{count+1}"] / data.count
      else
        analysis["#{count+1}"] = 0
      end
    end
    
    analysis
  end

end
