class SchoolReport < ActiveRecord::Base
	def calculate_reports(class_reports)
		
		quiz_question_count = 0
	  report_name = ''
	  participating_students_count = 0
	  participating_class_count = 0
	  course_ids = []
	  teacher_name = {}
	  submitted_students_count = {}
	  item_analysis = {}
	  school_name = ''
	  analysis = {}
	  class_misconceptions = {}
	  total_class_misconceptions = {}


		class_reports.each do |report|
			if self.probe_id == report.probe_id
				participating_class_count += 1
				quiz_question_count = report.quiz_question_count if quiz_question_count == 0
				if report_name == ''
					course = Course.find(report.course_id)
					report_name = course.account.parent_account.name + course.account.name
				end
				participating_students_count += report.submitted_students_count
				course_ids << report.course_id
				teacher_name["#{report.course_id}"] = report.teacher_name
				submitted_students_count["#{report.course_id}"] = report.submitted_students_count
				item_analysis["#{report.course_id}"] = JSON.parse(report.item_analysis)
				school_name = report.school_name
				quiz_question_count.times do |count|
	        if report.item_analysis != nil
	          if analysis["#{count+1}"] == nil
	            analysis["#{count+1}"] = JSON.parse(report.item_analysis)["#{count+1}"]
	          else
	            analysis["#{count+1}"] += JSON.parse(report.item_analysis)["#{count+1}"]
	          end
	        end
	      end

	      class_misconceptions["#{report.course_id}"] = {}

	      total_user_misconceptions = JSON.parse(report.total_user_misconceptions)
	      total_user_misconceptions.each do |key, value|

	      	#
	      	# if the quiz was made from an assessment question, associate the misconceptions with that
	      	if QuizMisconception.find(key).assessment_misconception
		      	class_misconceptions["#{report.course_id}"]["#{QuizMisconception.find(key).assessment_misconception.id}"] = value

		      	if total_class_misconceptions["#{QuizMisconception.find(key).assessment_misconception.id}"].nil?
		      		total_class_misconceptions["#{QuizMisconception.find(key).assessment_misconception.id}"] = value
		      	else
		      		count = total_class_misconceptions["#{QuizMisconception.find(key).assessment_misconception.id}"]
		      		count += value
		      		total_class_misconceptions["#{QuizMisconception.find(key).assessment_misconception.id}"] = count
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
    self.course_ids = course_ids.to_json
    self.teacher_name = teacher_name.to_json
    self.submitted_students_count = submitted_students_count.to_json
    self.item_analysis = item_analysis.to_json
    self.school_name = school_name
    self.analysis = analysis.to_json
    self.class_misconceptions = class_misconceptions.to_json
    self.total_class_misconceptions = total_class_misconceptions.to_json
    self.save!
  end
end
