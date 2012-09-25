class Report < ActiveRecord::Base
	def calculate_reports(context)
		question_banks = AssessmentQuestionBank.active
		context.sub_accounts.active.each do |district|
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
	end
end
