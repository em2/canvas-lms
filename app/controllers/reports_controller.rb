class ReportsController < ApplicationController
	def index
		if is_authorized?(@current_user) # Make sure the user is authorized to do this

      add_crumb("Reports")

      @question_bank = AssessmentQuestionBank.active
      
   #    @rosters = Roster.by_name

   #    is_admin?
   #    is_teacher?

   #    @courses = []

   #    @rosters.each do |roster|
		  
			#   if roster.account.courses.are_available.count > 0
			# 	  @found_teacher = false
			#   	roster.account.courses.by_name_available.each do |course|
			# 			course.teachers.each do |teacher|
			# 				if (teacher.id == @current_user.id || @is_admin)
			# 					@courses << course
			# 					break
			# 				end
			# 			end
			# 		end
		 #    end
			# end
    else
      redirect_back_or_default(dashboard_url)
    end
	end
	def show
    if is_authorized?(@current_user) # Make sure the user is authorized to do this
      @current_course = AssessmentQuestionBank.find(params[:id])
      
      add_crumb("Reports", reports_path)
      add_crumb(@current_course.title)

      is_admin?
      is_teacher?

      # @assessments = []
      # @current_course.quizzes.each do |assessment|
      # 	@assessments << assessment
      # end
    else
      redirect_back_or_default(dashboard_url)
    end
	end

	def is_admin?
    @is_admin = is_authorized_action?(@domain_root_account, @current_user, :manage)
  end

  def is_teacher?
    @found_teacher = false
    if Course.are_available.count > 0
      Course.by_name_available.each do |course|
        course.teachers.each do |teacher|
          if (teacher.id == @current_user.id)
            @found_teacher = true
            break
          end
          if @found_teacher
            break
          end
        end
        if @found_teacher
          break
        end
      end
    end
    @is_teacher = @found_teacher
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
