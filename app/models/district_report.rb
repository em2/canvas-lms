class DistrictReport < ActiveRecord::Base
	def calculate_reports(school_reports)
		
		quiz_question_count = 0
	  report_name = ''
	  participating_students_count = 0
	  participating_class_count = 0
	  account_ids = []
	  submitted_students_count = {}
	  item_analysis = {}
	  analysis = {}    
    teachers_count = {}
    total_teachers_count = 0
	  school_misconceptions = {}
	  total_school_misconceptions = {}


		school_reports.each do |report|
			if self.probe_id == report.probe_id
				participating_class_count += 1
				quiz_question_count = report.quiz_question_count if quiz_question_count == 0
				report_name = Account.find(self.account_id).name if report_name == ''

				account_ids << report.account_id
				
				counter = 0
				JSON.parse(report.submitted_students_count).each do |id, count|
					counter += count
				end

				teacher_count = JSON.parse(report.teacher_name).count
				teachers_count["#{report.account_id}"] = teacher_count
				total_teachers_count += teacher_count

				participating_students_count += counter
				submitted_students_count["#{report.account_id}"] = counter

				item_analysis["#{report.account_id}"] = JSON.parse(report.analysis)
				quiz_question_count.times do |count|
	        if report.item_analysis != nil
	          if analysis["#{count+1}"] == nil
	            analysis["#{count+1}"] = JSON.parse(report.analysis)["#{count+1}"]
	          else
	            analysis["#{count+1}"] += JSON.parse(report.analysis)["#{count+1}"]
	          end
	        end
	      end

	      school_misconceptions["#{report.account_id}"] = {}

	      total_class_misconceptions = JSON.parse(report.total_class_misconceptions)
	      total_class_misconceptions.each do |key, value|

	      	#
	      	# if the quiz was made from an assessment question, associate the misconceptions with that
	      	if key
		      	school_misconceptions["#{report.account_id}"]["#{key}"] = value

		      	if total_school_misconceptions["#{key}"].nil?
		      		total_school_misconceptions["#{key}"] = value
		      	else
		      		count = total_school_misconceptions["#{key}"]
		      		count += value
		      		total_school_misconceptions["#{key}"] = count
		      	end
		      end
	      end
	    end
		end



		quiz_question_count.times do |count|
      if participating_class_count > 0
        analysis["#{count+1}"] = analysis["#{count+1}"] / participating_class_count
      else
        analysis["#{count+1}"] = 0
      end
    end

    self.quiz_question_count = quiz_question_count
    self.report_name = report_name
    self.participating_students_count = participating_students_count
    self.participating_class_count = participating_class_count
    self.account_ids = account_ids.to_json
    self.submitted_students_count = submitted_students_count.to_json
    self.item_analysis = item_analysis.to_json
    self.analysis = analysis.to_json
    self.teachers_count = teachers_count.to_json
    self.total_teachers_count = total_teachers_count
    self.school_misconceptions = school_misconceptions.to_json
    self.total_school_misconceptions = total_school_misconceptions.to_json
    self.save!
  end
end
