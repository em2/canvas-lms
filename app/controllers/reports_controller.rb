class ReportsController < ApplicationController
	def index
		if is_authorized?(@current_user) && authorized_action(@context, @current_user, :read) # Make sure the user is authorized to do this

      add_crumb("Reports")

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

  def calculate_reports
    if is_authorized?(@current_user) && authorized_action(@context, @current_user, :read) # Make sure the user is authorized to do this
      if !report = Report.find_by_account_id(@context.id)
        report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end
      puts "Attempting to calculate reports."
      if !report.in_job
        report.in_job = true
        report.save!
        Delayed::Job.enqueue(ReportCalculateJob.new(report, @context))
        # report.calculate_reports(@context)
        flash[:notice] = "Attempting to calculate the reports..."
      else
        flash[:error] = "The report is already in the queue."
      end
      
      
      redirect_back_or_default(reports_path)
    else
      flash[:notice] = "Not Authorized."
      redirect_back_or_default(dashboard_url)
    end

  end
end
