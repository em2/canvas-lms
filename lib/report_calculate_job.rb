class ReportCalculateJob < Struct.new(:report, :context)
  
  def perform

    report.calculate_reports(context)
    
  end
  
end