class ReportsController < ApplicationController
  before_filter :require_user

	def index

		if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this

      add_crumb("Reports")

      @context = prepare_for_report
      @active_tab = "reports"

      @question_bank = AssessmentQuestionBank.active
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end

	end

  def calculate_reports
    if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this
      prepare_for_report
      puts "Attempting to calculate reports."
      if !@report.in_job
        @report.in_job = true
        @report.save!
        Delayed::Job.enqueue(ReportCalculateJob.new(@report, @context))
        # @report.calculate_reports(@context)
        flash[:notice] = "Attempting to calculate the reports..."
      else
        flash[:error] = "The report is already in the queue."
      end
      
      
      redirect_to :back

    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end

  end
end
