class IdGatekeepersController < ApplicationController
  def generate
    if (params[:id_gatekeeper][:instance] == "" ||  params[:id_gatekeeper][:stage] == nil)
      flash[:notice] = "Please complete the form."
      redirect_back_or_default(dashboard_url)
    else
      get_context
      @context = @domain_root_account || Account.default unless @context.is_a?(Account)
      @context = @context.root_account || @context
      
      #
      # Create the IdGatekeeper
      @id_gatekeeper = IdGatekeeper.new
      
      #
      # Create the Course
      @course = Course.create!(:name => params[:id_gatekeeper][:course], :course_code => params[:id_gatekeeper][:course])
      @course.offer!
      
      #
      # Enroll the current user as the teacher
      @enroll=@course.enroll_teacher(@current_user)
      @enroll.workflow_state = 'active'
      @enroll.save!
      
      
      #
      # Create the Assessment
      @quiz = @course.quizzes.create
      @probe = AssessmentQuestionBank.find(params[:id_gatekeeper][:probe])
      @title = @probe.title + params[:id_gatekeeper][:stage] + params[:id_gatekeeper][:instance] + @course.name
      @quiz.title = @title
      @quiz.description = nil
      @quiz.hide_results = 'always'
      @quiz.show_correct_answers = false
      @quiz.content_being_saved_by(@current_user)
      @quiz.infer_times()
      @quiz.add_assessment_questions(AssessmentQuestionBank.find(params[:id_gatekeeper][:probe]).assessment_questions)
      @quiz.generate_quiz_data()
      @quiz.published_at = Time.now
      @quiz.workflow_state = 'available'
      @quiz.last_assignment_id = @quiz.assignment_id
      @quiz.anonymous_submissions = false
#      @quiz.id_gatekeeper_id = @id_gatekeeper.id
      @quiz.save!
      
      
      
      #
      # Create the students
      srand
      @num_students = params[:id_gatekeeper][:students].to_i
      i = 0
      while(i < @num_students)
        @student_id = rand(8999999999)+1000000000
        @student = User.create!
        @student_number = (i + 1).to_s
        #
        # the the user have a 4 digit number ie: 0001
        while (@student_number.length < 4)
          @student_number.insert(0, '0')
        end
        
        @student.name = @title + @student_number
        @student.sortable_name = @title + @student_number
        @student.browser_locale = 'en'
        
        
        @pseudonym = @student.pseudonyms.build(:account => @context)
        @pseudonym.user = @student
        @pseudonym.unique_id = @student_id
        @pseudonym.account = @context
        @pseudonym.workflow_state = 'active'
        
        @pseudonym.password = 'asdfasdf'
        @pseudonym.password_confirmation = 'asdfasdf'
        @pseudonym.save_without_session_maintenance
        
        @student.register!
        @student.save!
        
        @enroll = @course.enroll_student(@student)
        @enroll.workflow_state = 'active'
        @enroll.save!
        
        
        i += 1
      end
      
      
    end
  end
  
  def show
    
  end

end
