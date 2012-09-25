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
      @current_probe = AssessmentQuestionBank.find(params[:id])
      
      add_crumb("Reports", reports_path)
      add_crumb(@current_probe.title)

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

  def calculate_reports
    if is_authorized?(@current_user) # Make sure the user is authorized to do this
      question_banks = AssessmentQuestionBank.active
      @context.sub_accounts.active.each do |district|
        school_reports = []
        district.sub_accounts.active.each do |school|
          class_reports = []
          school.courses.active.each do |course|
            course.quizzes.active.each do |quiz|
              probe = nil
              question_banks.each do |qb|
                if quiz.probe_name && quiz.probe_name[qb.title]
                  probe = qb
                  break
                end
              end
              if probe
                if !class_report = ClassReport.find_by_course_id_and_probe_id_and_quiz_id(course.id, probe.id, quiz.id)
                  class_report = ClassReport.create!(:course_id => course.id, :probe_id => probe.id, :quiz_id => quiz.id)
                end
                class_report.calculate_reports
                class_reports << class_report
              end
            end
          end
          # calculate school report
          question_banks.each do |qb|
            if !school_report = SchoolReport.find_by_account_id_and_probe_id(school.id, qb.id)
              school_report = SchoolReport.create!(:account_id => school.id, :probe_id => qb.id)
            end
            school_report.calculate_reports(class_reports)
            school_reports << school_report
          end
        end
        # calculate district report
        question_banks.each do |qb|
          if !district_report = DistrictReport.find_by_account_id_and_probe_id(district.id, qb.id)
            district_report = DistrictReport.create!(:account_id => district.id, :probe_id => qb.id)
          end
          district_report.calculate_reports(school_reports)
        end
      end
      flash[:notice] = "Attempting to calculate the reports..."
      redirect_back_or_default(reports_path)
    else
      flash[:notice] = "Not Authorized."
      redirect_back_or_default(dashboard_url)
    end

  end
end
