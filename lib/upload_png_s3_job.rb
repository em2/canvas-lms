class UploadPngS3Job < Struct.new(:quiz_submission_id, :quiz_id, :user_id, :id, :data)
  
  def perform

    QuizSubmission.save_student_explain_to_png(quiz_submission_id, quiz_id, user_id, id, data)
    
  end
  
end