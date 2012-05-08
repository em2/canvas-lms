class RosterGenerateJob < Struct.new(:roster, :context, :probe, :instance, :stage, :course_title, :current_user, :num_students)
  
  def perform
    roster.generate_probes(context, probe, instance, stage, course_title, current_user, num_students)
  end

  
end