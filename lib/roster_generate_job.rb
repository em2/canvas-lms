class RosterGenerateJob < Struct.new(:roster, :context, :probe, :instance, :stage, :course_title, :current_user, :number_students, :district, :district_account, :school_account, :teacher, :pre_post, :course_id)

  def perform

    roster.generate_probes(context, probe, instance, stage, course_title, current_user, number_students, district, district_account, school_account, teacher, pre_post, course_id)

  end

end
