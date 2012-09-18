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
          find_courses_in_account(sub_sub_account, sub_sub_account, @current_probe, @schools)
        end
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
      add_crumb("Schools", report_school_reports_path)
      add_crumb(@account.parent_account.name + @account.name)

      @data = {}
      @account.courses.active.each do |course|
        course.quizzes.active.each do |quiz|
          if quiz.probe_name && quiz.probe_name[@current_probe.title]
            @quiz = quiz
          end
        end

        if @quiz && (@quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics))
          # managed_quiz_data(@quiz) if @quiz.grants_right?(@current_user, session, :grade) || @quiz.grants_right?(@current_user, session, :read_statistics)
          
          @data[course.id] = gather_class_responses(course, @quiz)
        else
          flash[:error] = "No Assessment Found"
          redirect_back_or_default(report_school_reports_path(params[:report_id]))
        end
      end
      @total_students_count = 0
      @data.each do |data|

        @total_students_count += @data[data.first]["submitted_students_count"].to_i
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

  # def gather_responses
  #   @quiz_question_count = 0
  #   @quiz.quiz_data.each do |quiz_data|
  #     next if quiz_data[:question_type] == "text_only_question"
  #     @quiz_question_count += 1
  #   end
  #   #
  #   # Gather all the correct responses, student responses, and explaination text
  #   @data = {}
  #   @data["q"] = {}
  #   @data["number_correct"] = {}
  #   @data["number_attempted"] = {}
  #   @data["percent_correct"] = {}
  #   @submitted_students.each do |user|
  #     number_correct = 0
  #     number_attempted = 0
  #     @question_count = 1
  #     @submission = @quiz.quiz_submissions.find_by_quiz_id_and_user_id(@quiz.id,user.id)
  #     @submission.quiz_data.each_with_index do |quiz_data, quiz_index|
  #       next if quiz_data[:question_type] == "text_only_question"
  #       begin
  #         @sub_data = @submission.submission_data.detect{|a| a[:question_id] == quiz_data[:id]}
  #         if @data["percent_correct"]["#{quiz_index}"] == nil
  #           @data["percent_correct"]["#{quiz_index}"] = 0
  #         end
  #         if @data["q"]["#{user.id}"] == nil
  #           @data["q"]["#{user.id}"] = {"#{@question_count}" => 'Inc'}
  #         else
  #           @data["q"]["#{user.id}"].merge!({"#{@question_count}" => 'Inc'})
  #         end
  #         quiz_data[:answers].each_with_index do |answer, index|

  #           if @sub_data[:answer_id] == answer[:id]
  #             number_attempted += 1
  #             if answer[:weight] > 0
  #               number_correct += 1
  #               @data["q"]["#{user.id}"].merge!({"#{@question_count}" => '*'})
  #               num = @data["percent_correct"]["#{quiz_index}"].to_i
  #               num += 1
  #               @data["percent_correct"]["#{quiz_index}"] = num
  #             else
  #               case index+1
  #               when 1
  #                 @data["q"]["#{user.id}"].merge!({"#{@question_count}" => 'G'})
  #               when 2
  #                 @data["q"]["#{user.id}"].merge!({"#{@question_count}" => 'L'})
  #               when 3
  #                 @data["q"]["#{user.id}"].merge!({"#{@question_count}" => 'E'})
  #               end
  #             end
  #           end
  #         end
  #         @question_count += 1
  #       rescue
  #         r2d=2
  #       end
  #     end
  #     @data["number_correct"]["#{user.id}"] = number_correct
  #     @data["number_attempted"]["#{user.id}"] = number_attempted
  #   end
  # end

end
