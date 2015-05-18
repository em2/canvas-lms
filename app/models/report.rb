class Report < ActiveRecord::Base
  def self.calculate_them
    context = Account.default
    if !report = Report.find_by_account_id(context.id)
      report = Report.create!(:account_id => context.id, :calculation_count => 0, :in_job => false)
    end
    puts "Attempting to calculate reports."
    if !report.in_job
      report.in_job = true
      report.save!
      Delayed::Job.enqueue(ReportCalculateJob.new(report, context))
      puts "bfcoder is done queueing reports calculation."
    else
      puts "bfcoder is already calculating reports."
    end

  end

	def calculate_reports(context)
		question_banks = AssessmentQuestionBank.active
		context.sub_accounts.active.each do |district|
      school_reports = []
      district.sub_accounts.active.each do |school|
        class_reports = []
        # calculate class report
        school.courses.active.each do |course|
          if !course.em2_identifier
            course.em2_identifier = course.course_code
            course.save!
          end
          course.quizzes.active.each do |quiz|
            probe = nil
            if quiz.question_bank_id
              probe = AssessmentQuestionBank.find(quiz.question_bank_id)
            else
              #
              # for backward compatability, use the old style of probe lookup
              quiz_probe_name = quiz.probe_name
              4.times { quiz_probe_name.chop! if quiz_probe_name }
              question_banks.each do |qb|
                if quiz_probe_name && quiz_probe_name == qb.title
                  probe = qb
                  break
                end
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
          probe = nil
          class_reports.each do |cr|
            if cr.probe_id == qb.id
              probe = qb
              break
            end
          end
          if probe
            if !school_report = SchoolReport.find_by_account_id_and_probe_id(school.id, qb.id)
              school_report = SchoolReport.create!(:account_id => school.id, :probe_id => qb.id)
            end
            school_report.calculate_reports(class_reports)
            school_reports << school_report
          end
        end
      end
      # calculate district report
      question_banks.each do |qb|
        probe = nil
        school_reports.each do |sr|
          if sr.probe_id == qb.id
            probe = qb
            break
          end
        end
        if probe
          if !district_report = DistrictReport.find_by_account_id_and_probe_id(district.id, qb.id)
            district_report = DistrictReport.create!(:account_id => district.id, :probe_id => qb.id)
          end
          district_report.calculate_reports(school_reports)
        end
      end
    end
    self.in_job = false
    self.calculation_count += 1
    self.save!
	end

  TAB_COURSES = 0
  TAB_REPORTS = 1
  TAB_ROSTERS = 2

  def self.default_tabs
    [
      { :id => TAB_COURSES, :label => t('#account.tab_courses', "Courses"), :css_class => 'courses', :href => :courses_path, :no_args => true },
      { :id => TAB_REPORTS, :label => t('#tabs.summary_reports', "Summary Reports"), :css_class => 'reports', :href => :reports_path, :no_args => true },
      # { :id => TAB_ROSTERS, :label => t('#tabs.rosters', "Rosters"), :css_class => 'rosters', :href => :rosters_path, :no_args => true }
    ]
  end

  def tabs_available(user=nil, opts={})
    tabs = []
    tabs += Report.default_tabs
    tabs
  end
  memoize :tabs_available
end
