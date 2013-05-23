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
    earliest_submission = Time.now
    latest_submission = AssessmentQuestionBank.find(self.probe_id).created_at
    school_difficulties = {}
    total_school_difficulties = 0
    counts = {}


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

        report_analysis = JSON.parse(report.analysis)
        item_analysis["#{report.account_id}"] = report_analysis

        quiz_question_count.times do |count|
          counts["#{count+1}"] = 0 if counts["#{count+1}"].nil?
          counts["#{count+1}"] += 1 unless report_analysis.nil? || report_analysis["#{count+1}"].nil?
        end

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
        school_difficulties["#{report.account_id}"] = report.total_class_difficulties
        total_school_difficulties += report.total_class_difficulties
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
        analysis["#{count+1}"] = analysis["#{count+1}"] / counts["#{count+1}"]
      else
        analysis["#{count+1}"] = nil
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
    self.earliest_submission = earliest_submission
    self.latest_submission = latest_submission
    self.school_difficulties = school_difficulties.to_json
    self.total_school_difficulties = total_school_difficulties
    self.save!
  end
end
