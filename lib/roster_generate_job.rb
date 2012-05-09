class RosterGenerateJob < Struct.new(:roster, :context, :probe, :instance, :stage, :course_title, :current_user, :num_students, :district, :district_account, :school_account, :teacher)
  
  def perform
    roster.generate_probes(context, probe, instance, stage, course_title, current_user, num_students, district, district_account, school_account, teacher)
  end
  
end