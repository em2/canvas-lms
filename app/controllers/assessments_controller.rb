class AssessmentsController < ApplicationController
  def index
    @assessments = Assessment.all
  end
  
  def generate
    if (params[:assessment][:stage] == nil)
      flash[:notice] = "Please complete the form."
      redirect_back_or_default(dashboard_url)
    else
      #
      # get the current context
      # in this case it should usually be the domain_root_account
      # but I left the other stuff in as Canvas does it's own thing sometimes...
      get_context
      @context = @domain_root_account || Account.default unless @context.is_a?(Account)
      @context = @context.root_account || @context
      
      
      #
      # Create the title
      @probe = AssessmentQuestionBank.find(params[:assessment][:probe])
      @instance = '001'
      @title = @probe.title + params[:assessment][:stage] + @instance + params[:assessment][:course]
      
      #
      # Automatically increment the instance number until one is
      # found that hasn't been used for that assessment title
      while (Assessment.find_by_assessment_name(@title) != nil)
        @instance = @instance.to_i
        @instance += 1
        @instance = @instance.to_s
        while (@instance.length < 3)
          @instance.insert(0, '0')
        end
        @title = @probe.title + params[:assessment][:stage] + @instance + params[:assessment][:course]
      end
      
      #
      # Make sure another course by that same name doesn't exist
      # This should never happen because of the auto increment code above,
      # but just in case it does, this is a safe guard.
      if (Course.find_by_name(@title))
        flash[:notice] = "Duplicate Course, please choose different name."
        redirect_back_or_default(dashboard_url)
      end
      
      #
      # Create the Assessment
      @assessment = Assessment.new
      @assessment.assessment_name = @title
      @assessment.course_name_short = params[:assessment][:course]
      @assessment.stage = params[:assessment][:stage]
      @assessment.instance = @instance
      @assessment.save!
      
      #
      # Create the Course
      @course = Course.create!(:name => @title, :course_code => @title)
      @course.offer!
      
      #
      # Enroll the current user as the teacher
      @enroll=@course.enroll_teacher(@current_user)
      @enroll.workflow_state = 'active'
      @enroll.save!
      
      
      #
      # Create the Assessment
      @quiz = @course.quizzes.create
      @quiz.title = @title
      @quiz.description = nil
      @quiz.hide_results = 'always'
      @quiz.show_correct_answers = false
      @quiz.content_being_saved_by(@current_user)
      @quiz.infer_times()
      @quiz.add_assessment_questions(AssessmentQuestionBank.find(params[:assessment][:probe]).assessment_questions)
      @quiz.generate_quiz_data()
      @quiz.published_at = Time.now
      @quiz.workflow_state = 'available'
      @quiz.last_assignment_id = @quiz.assignment_id
      @quiz.anonymous_submissions = false
      @quiz.save!
      
      #
      # add created items to the assessment
      @assessment.quiz = (@quiz)
      @assessment.assessment_question_bank = (@probe)
      @assessment.course = (@course)
      
      #
      # Create the students
      srand
      @num_students = params[:assessment][:students].to_i
      i = 0
      while(i < @num_students)
        @student_id = rand(8999999999)+1000000000
        #
        # Make sure student_id is unique
        while (Pseudonym.find_by_unique_id(@student_id) != nil)
          @student_id = rand(8999999999)+1000000000
        end
        @student = User.create!
        @student_number = (i + 1).to_s
        #
        # the the user have a 4 digit number ie: 0001
        while (@student_number.length < 4)
          @student_number.insert(0, '0')
        end
        
        @student.name = @student_id
        @student.sortable_name = @title + @student_number
        @student.short_name = @student_number
        @student.browser_locale = 'en'
        
        #
        # pseudonym is what stores the users login information, let's build it
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
        
        #
        # add user to the assessment
        @assessment.users << @student
        
        i += 1
      end
      
      @assessment.save!
      
      redirect_to @assessment
      
    end
  end
  
  def select_assessment_to_show
    @assessment = Assessment.find(params[:assessment][:assessment])
    redirect_to @assessment
  end
  
  def show
    get_context
    @current_assessment = Assessment.find(params[:id])
    add_crumb("Assessments")
    add_crumb(@current_assessment.assessment_name)
    
    if (!AssessmentQuestionBank.nil?)
      @quiz = AssessmentQuestionBank.first
      if is_authorized_action?(@quiz, @current_user, :create)
        @can_generate_assessment = true
      end
    end
  end

end
