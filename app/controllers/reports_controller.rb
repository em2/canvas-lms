class ReportsController < ApplicationController
  before_filter :require_user

	def index

		if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this

      add_crumb("Reports")

      if !@report = Report.find_by_account_id(@context.id)
        @report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end

      @context = @report
      @active_tab = "reports"

      @question_bank = AssessmentQuestionBank.active
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end

	end

  def calculate_reports
    if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this
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
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end

  end
end
