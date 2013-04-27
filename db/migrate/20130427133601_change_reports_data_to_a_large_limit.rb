class ChangeReportsDataToALargeLimit < ActiveRecord::Migration
  tag :predeploy

  def self.up
    change_table :class_reports do |t|
      t.change :q, :text, :limit => 16777215
      t.change :number_correct, :text, :limit => 16777215
      t.change :number_attempted, :text, :limit => 16777215
      t.change :percent_correct, :text, :limit => 16777215
      t.change :item_analysis, :text, :limit => 16777215
      t.change :submitted_students_ids, :text, :limit => 16777215
      t.change :submissions, :text, :limit => 16777215
      t.change :user_misconceptions, :text, :limit => 16777215
      t.change :total_user_misconceptions, :text, :limit => 16777215
      t.change :user_difficulties, :text, :limit => 16777215
    end

    change_table :school_reports do |t|
      t.change :item_analysis, :text, :limit => 16777215
      t.change :teacher_name, :text, :limit => 16777215
      t.change :submitted_students_count, :string, :limit => 2048
      t.change :analysis, :text, :limit => 16777215
      t.change :class_misconceptions, :text, :limit => 16777215
      t.change :total_class_misconceptions, :text, :limit => 16777215
      t.change :class_difficulties, :text, :limit => 16777215
      t.change :quiz_ids, :text, :limit => 16777215
    end

    change_table :district_reports do |t|
      t.change :account_ids, :string, :limit => 2048
      t.change :item_analysis, :text, :limit => 16777215
      t.change :teachers_count, :text, :limit => 16777215
      t.change :submitted_students_count, :string, :limit => 2048
      t.change :analysis, :text, :limit => 16777215
      t.change :school_misconceptions, :text, :limit => 16777215
      t.change :total_school_misconceptions, :text, :limit => 16777215
      t.change :school_difficulties, :text, :limit => 16777215
    end
  end

  def self.down
    change_table :district_reports do |t|
      t.change :account_ids, :string
      t.change :item_analysis, :string, :limit => 2048
      t.change :teachers_count, :string
      t.change :submitted_students_count, :string
      t.change :analysis, :string
      t.change :school_misconceptions, :string, :limit => 2048
      t.change :total_school_misconceptions, :string, :limit => 2048
      t.change :school_difficulties, :string
    end

    change_table :school_reports do |t|
      t.change :item_analysis, :string, :limit => 2048
      t.change :teacher_name, :string
      t.change :submitted_students_count, :string
      t.change :analysis, :string
      t.change :class_misconceptions, :string, :limit => 2048
      t.change :total_class_misconceptions, :string, :limit => 2048
      t.change :class_difficulties, :string
      t.change :quiz_ids, :string
    end

    change_table :class_reports do |t|
      t.change :q, :string, :limit => 2048
      t.change :q, :string, :limit => 2048
      t.change :number_correct, :string, :limit => 2048
      t.change :number_attempted, :string, :limit => 2048
      t.change :percent_correct, :string, :limit => 2048
      t.change :item_analysis, :string, :limit => 2048
      t.change :submitted_students_ids, :string, :limit => 2048
      t.change :submissions, :string, :limit => 2048
      t.change :user_misconceptions, :string, :limit => 2048
      t.change :total_user_misconceptions, :string, :limit => 2048
      t.change :user_difficulties, :string, :limit => 2048
    end
  end
end
