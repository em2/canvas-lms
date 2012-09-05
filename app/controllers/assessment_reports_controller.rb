class AssessmentReportsController < ApplicationController
	before_filter :get_context

  def show
  	@quiz = Quiz.find(params[:id])
  	if authorized_action(@quiz, @current_user, :read_statistics)
      respond_to do |format|
        format.html {
        	add_crumb("Reports", reports_path)
          add_crumb(@quiz.title, named_context_url(@context, :context_quiz_url, @quiz))
          add_crumb(t(:statistics_crumb, "Statistics"), named_context_url(@context, :context_quiz_statistics_url, @quiz))
          @statistics = @quiz.statistics(params[:all_versions] == '1')
          user_ids = @quiz.quiz_submissions.select{|s| !s.settings_only? }.map(&:user_id)
          @submitted_users = user_ids.empty? ? [] : User.find_all_by_id(user_ids).compact.uniq.sort_by(&:last_name_first)
          
          is_admin?

          @found_teacher = false
          Course.find(params[:report_id]).teachers.each do |teacher|
            if (teacher.id == @current_user.id)
              @found_teacher = true
              break
            end
          end

          @quiz_question_count = 0
          @quiz.quiz_data.each do |quiz_data|
            next if quiz_data[:question_type] == "text_only_question"
            @quiz_question_count += 1
          end
          #
          # Gather all the correct responses, student responses, and explaination text
          @sr = {}
          @cor = {}
          @expl = {}
          @submitted_users.each do |user|
            @cor_question_count = 1
            @submission = @quiz.quiz_submissions.find_by_quiz_id_and_user_id(@quiz.id,user.id)
            @submission.quiz_data.each do |quiz_data|
              next if quiz_data[:question_type] == "text_only_question"
              begin
                @sub_data = @submission.submission_data.detect{|a| a[:question_id] == quiz_data[:id]}
                if @sr["#{user.id}"] == nil
                  @sr["#{user.id}"] = {"#{@cor_question_count}" => ''}
                  @expl["#{user.id}"] = {"#{@cor_question_count}" => @sub_data[:explain_area]}
                else
                  @sr["#{user.id}"].merge!({"#{@cor_question_count}" => ''})
                  @expl["#{user.id}"].merge!({"#{@cor_question_count}" => @sub_data[:explain_area]})
                end
                quiz_data[:answers].each_with_index do |answer, index|
                  if answer[:weight] > 0
                    @cor["#{@cor_question_count}"] = index+1
                  end
                  if @sub_data[:answer_id] == answer[:id]
                    @sr["#{user.id}"].merge!({"#{@cor_question_count}" => index+1})
                    # @expl["#{user.id}"].merge!({"#{@cor_question_count}" => @sub_data[:explain_area]})
                  end
                end
                @cor_question_count += 1
              rescue
                r2d=2
              end
            end
          end
        }
      end
    end
  end

  def is_admin?
    @is_admin = is_authorized_action?(@domain_root_account, @current_user, :manage)
  end

end
