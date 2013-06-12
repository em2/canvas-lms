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
    earliest_submission = Time.now
    latest_submission = AssessmentQuestionBank.find(self.probe_id).created_at
    class_difficulties = {}
    total_class_difficulties = 0
    quiz_ids = {}
    counts = {}

    class_reports.each do |report|
      if self.probe_id == report.probe_id
        participating_class_count += 1
        quiz_question_count = report.quiz_question_count if quiz_question_count == 0
        course = Course.find(report.course_id)
        if report_name == ''
          report_name = course.account.parent_account.name + course.account.name
        end
        participating_students_count += report.submitted_students_count
        course_ids << course.id

        current_probe = AssessmentQuestionBank.find(self.probe_id)

        course.quizzes.active.each do |quiz|
          if quiz.question_bank_id == self.probe_id
            quiz_ids["#{course.id}"] = quiz.id
          elsif !quiz.probe_name.nil? && quiz.probe_name.include?(current_probe.title) # for backwards compatibility
            quiz_ids["#{course.id}"] = quiz.id
          end
        end

        report_analysis = JSON.parse(report.item_analysis)

        quiz_question_count.times do |count|
          counts["#{count+1}"] = 0 if counts["#{count+1}"].nil?
          counts["#{count+1}"] += 1 unless report_analysis.nil? || report_analysis["#{count+1}"].nil?
        end

        teacher_name["#{report.course_id}"] = report.teacher_name
        submitted_students_count["#{report.course_id}"] = report.submitted_students_count
        item_analysis["#{report.course_id}"] = report_analysis
        school_name = report.school_name

        if report.earliest_submission && report.earliest_submission < earliest_submission
          earliest_submission = report.earliest_submission
        end

        if report.latest_submission && report.latest_submission > latest_submission
          latest_submission = report.latest_submission
        end

        quiz_question_count.times do |count|
          if report.item_analysis != nil
            if analysis["#{count+1}"] == nil
              analysis["#{count+1}"] = report_analysis["#{count+1}"] unless report_analysis["#{count+1}"].nil?
            else
              analysis["#{count+1}"] += report_analysis["#{count+1}"] unless report_analysis["#{count+1}"].nil?
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
        class_difficulties["#{report.course_id}"] = report.total_user_difficulties
        total_class_difficulties += report.total_user_difficulties
      end
    end

    #
    # this would happen if there were no submissions
    if earliest_submission > latest_submission
      earliest_submission = nil
      latest_submission = nil
    end

    quiz_question_count.times do |count|
      if !counts["#{count+1}"].nil? && counts["#{count+1}"] > 0
        percent_correct = analysis["#{count+1}"].to_f / counts["#{count+1}"].to_f / 100 + 0.005 # get percentage and round up
        percent_correct = (percent_correct * 100).to_i
        analysis["#{count+1}"] = percent_correct
      else
        analysis["#{count+1}"] = nil
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
    self.earliest_submission = earliest_submission
    self.latest_submission = latest_submission
    self.class_difficulties = class_difficulties.to_json
    self.total_class_difficulties = total_class_difficulties
    self.quiz_ids = quiz_ids.to_json
    self.save!
  end
end
