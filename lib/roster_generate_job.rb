class RosterGenerateJob < Struct.new(:roster, :context, :probe, :instance, :stage, :course_title, :current_user, :num_students)
  
  # include Workflow
  # #attr_accessible :course, :source, :import_type, :parameters
  # serialize :log
  # serialize :parameters
  # belongs_to :roster
  # #belongs_to :source, :class_name => 'Course'
  # #validates_length_of :added_item_codes, :maximum => maximum_text_length, :allow_nil => true, :allow_blank => true
  
  # workflow do
  #   state 'created'
  #   state 'started'
  #   state 'completed'
  #   state 'failed'
  # end
  
  # def tick(max_tick=100)
  #   self.progress ||= 0
  #   update_attribute(:progress, [(self.progress + 1), max_tick, 100].min)
  # end
  
  # def perform
  #   begin
  #     self.workflow_state = 'started'
  #     self.save!
      
  #     roster.generate_probes(context, probe, instance, stage, course_title, current_user, num_students)
      
  #     self.workflow_state = 'completed'
  #     self.progress = 100
  #     self.save!
  #   rescue => e
  #     self.workflow_state = 'failed'
  #     self.log = {
  #       :message => e.to_s,
  #       :backtrace => e.backtrace.join("\n")
  #     }
  #     self.save
  #   end
  # end
  
  # def perform_later
  #   self.perform
  # end
  # handle_asynchronously :perform_later, :max_attempts => 1

  def perform
    roster.generate_probes(context, probe, instance, stage, course_title, current_user, num_students)
  end

  
end