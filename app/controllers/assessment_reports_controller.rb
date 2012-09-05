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
        }
      end
    end
  end

  def is_admin?
    @is_admin = is_authorized_action?(@domain_root_account, @current_user, :manage)
  end

end
