class ClassReport < ActiveRecord::Base

	def calculate_reports()
		course = Course.find(self.course_id)
		quiz = Quiz.find(self.quiz_id)
		
    data = gather_class_responses(course, quiz)

		self.q = data["q"].to_json
		self.number_correct = data["number_correct"].to_json
		self.number_attempted = data["number_attempted"].to_json
		self.percent_correct = data["percent_correct"].to_json
		self.item_analysis = data["item_analysis"].to_json
		self.teacher_id = data["teacher_id"]
		self.teacher_name = data["teacher_name"]
		self.course_name = data["course_name"]
		self.school_name = data["school_name"]
		self.submitted_students_count = data["submitted_students_count"]
    self.submitted_students_ids = data["submitted_students_ids"].to_json
    self.quiz_question_count = data["quiz_question_count"]
		self.submissions = data["submissions"].to_json
    self.save!
	end
	

	def gather_class_responses(course, quiz)
    quiz_question_count = 0
    if quiz.quiz_data
      quiz.quiz_data.each do |quiz_data|
        next if quiz_data[:question_type] == "text_only_question"
        quiz_question_count += 1
      end
    end
    #
    # Gather all the correct responses, student responses, and explaination text
    data = {}
    data["q"] = {}
    data["number_correct"] = {}
    data["number_attempted"] = {}
    data["percent_correct"] = {}
    data["item_analysis"] = {}
    data["submissions"] = {}
    data["submitted_students_ids"] = []
    data["teacher_id"] = course.teachers.first.id
    data["teacher_name"] = course.teachers.first.sortable_name
    data["course_name"] = course.name
    data["school_name"] = course.account.name
    data["quiz_question_count"] = quiz_question_count

    submissions = quiz.quiz_submissions.select{|s| !s.settings_only? }
    submission_ids = {}
    submissions.each{|s| submission_ids[s.user_id] = s.id }
    submission_users = submissions.map{|s| s.user_id}
    students = course.students.find(:all, :order => User.sortable_name_order_by_clause).to_a
    submitted_students = students.select{|stu| submission_ids[stu.id] }
    if quiz.survey? && quiz.anonymous_submissions
      submitted_students = submitted_students.sort_by{|stu| submission_ids[stu.id] }
    end
    unsubmitted_students = students.reject{|stu| submission_ids[stu.id] }

    data["submitted_students_count"] = submitted_students.count
    if quiz.id == 11
      debugger
      r2d=2
    end
    submitted_students.each do |user|
      data["submitted_students_ids"] << user.id
      number_correct = 0
      number_attempted = 0
      question_count = 1
      submission = quiz.quiz_submissions.find_by_quiz_id_and_user_id(quiz.id,user.id)
      data["submissions"]["#{user.id}"] = submission.id
      submission.quiz_data.each_with_index do |quiz_data, quiz_index|
        next if quiz_data[:question_type] == "text_only_question"
        begin
          sub_data = submission.submission_data.detect{|a| a[:question_id] == quiz_data[:id]}
          if data["percent_correct"]["#{quiz_index}"] == nil
            data["percent_correct"]["#{quiz_index}"] = 0
          end
          if data["q"]["#{user.id}"] == nil
            data["q"]["#{user.id}"] = {"#{question_count}" => 'Inc'}
          else
            data["q"]["#{user.id}"].merge!({"#{question_count}" => 'Inc'})
          end
          quiz_data[:answers].each_with_index do |answer, index|

            if sub_data[:answer_id] == answer[:id]
              number_attempted += 1
              if answer[:weight] > 0
                number_correct += 1
                data["q"]["#{user.id}"].merge!({"#{question_count}" => '*'})
                num = data["percent_correct"]["#{quiz_index}"].to_i
                num += 1
                data["percent_correct"]["#{quiz_index}"] = num
              else
                case index+1
                when 1
                  data["q"]["#{user.id}"].merge!({"#{question_count}" => 'G'})
                when 2
                  data["q"]["#{user.id}"].merge!({"#{question_count}" => 'L'})
                when 3
                  data["q"]["#{user.id}"].merge!({"#{question_count}" => 'E'})
                end
              end
            end
          end
          question_count += 1
        rescue
          r2d=2
        end
      end
      data["number_correct"]["#{user.id}"] = number_correct
      data["number_attempted"]["#{user.id}"] = number_attempted
    end

    
    quiz_question_count.times do |count|
      if data["submitted_students_count"] > 0
        data["item_analysis"].merge!("#{count+1}"=>(data["percent_correct"]["#{count+1}"].to_f / data["submitted_students_count"].to_f * 100).to_i)
      else
        data["item_analysis"].merge!("#{count+1}"=>0)
      end
    end

    return data
  end

end
