class RostersController < ApplicationController
  def index
    get_context
    add_crumb("School Rosters")

    @rosters = Roster.all
    
  end
  
  def generate
    if (params[:rosters][:stage] == nil)
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
      @term = @context.enrollment_terms.active[-1]
      
      #
      # Create the names
      @probe = AssessmentQuestionBank.find(params[:rosters][:probe])
      @instance = params[:rosters][:instance]
      @stage = params[:rosters][:stage]
      @course_titles = params[:rosters][:courses].split(/[\r\n\t\,\; ]+/)

      
      #
      # Automatically increment the instance number until one is
      # found that hasn't been used for that assessment title
      # while (Roster.find_by_assessment_name(@title) != nil)
      #   @instance = @instance.to_i
      #   @instance += 1
      #   @instance = @instance.to_s
      #   while (@instance.length < 3)
      #     @instance.insert(0, '0')
      #   end
      #   @title = @probe.title + params[:rosters][:stage] + @instance + params[:rosters][:courses]
      # end
      
      #
      # Make sure another course by that same name doesn't exist
      # This should never happen because of the auto increment code above,
      # but just in case it does, this is a safe guard.
      # if (Course.find_by_name(@title))
      #   flash[:notice] = "Duplicate Course, please choose different name."
      #   redirect_back_or_default(dashboard_url)
      # end
      
      #
      # Create the Roster and Classroom
      @roster = Roster.new
      @classroom = Classroom.new
      
      i = 0
      while (i < @course_titles.count)
        @course_title = @course_titles[i]
        
        if (@course_title[/[Dd][0-9]{3}[Ss][0-9]{3}[Tt][0-9]{3}[Cc][0-9]{3}/] == nil || @course_title.size != 16)
          i += 1
          flash[:notice] = @course_title + " is not valid."
          next
        end
        
        #@title = @probe.title + @stage + @instance + @course_title
        
        @district = @course_title[/[Dd][0-9]{3}/]
        @school = @course_title[/[Ss][0-9]{3}/]
        @class = @course_title[/[Cc][0-9]{3}/]
        @teacher = @course_title[/[Tt][0-9]{3}/]
        
        if (!@district_account = Account.find_by_name(@district))
          @district_account = Account.create!(:name => @district, :parent_account => @context)
          @roster.name = @district
          @roster.accounts << @district_account
          @roster.save!
        end
        
        @roster = Roster.find_by_name(@district)
        
        if (!@school_account = Account.find_by_name(@school))
          @school_account = Account.create!(:name => @school, :parent_account => @district_account)
          @school_account.roster = @roster
          @school_account.save!
        end
        
#        @classroom = Classroom
        
        
        #
        # Create the Course
        if (!@course = Course.find_by_name(@course_title))
          @course = Course.create!(:name => @course_title, :course_code => @course_title, :account => @school_account)
          @course.offer!
          @course.save!
          @classroom.name = @course.name
          @classroom.roster = @roster
          @classroom.courses << @course
          @classroom.save!
        end
        
        
        #
        # Enroll the current user as the teacher
        if (!@course.enrollments.find_by_user_id(@current_user.id))
          @enroll=@course.enroll_teacher(@current_user)
          @enroll.workflow_state = 'active'
          @enroll.save!
        end
        
        
        #
        # Create the Assessment
        @quiz = @course.quizzes.create
        @quiz.title = @probe.full_name
        @quiz.probe_name = @probe.title + @stage + @instance
        @quiz.description = nil
        @quiz.hide_results = 'always'
        @quiz.show_correct_answers = false
        @quiz.content_being_saved_by(@current_user)
        @quiz.infer_times()
        @quiz.add_assessment_questions(AssessmentQuestionBank.find(params[:rosters][:probe]).assessment_questions)
        @quiz.generate_quiz_data()
        @quiz.published_at = Time.now
        @quiz.workflow_state = 'available'
        @quiz.last_assignment_id = @quiz.assignment_id
        @quiz.anonymous_submissions = false
        @quiz.save!
        
        #
        # add created items to the assessment
        #@roster.quiz = (@quiz)
        #@roster.assessment_question_bank = (@probe)
        #@roster.course = (@course)
        
        #
        # Create the students
        srand
        @num_students = params[:rosters][:students].to_i
        # calculate the number of extra students needed
        # course student enrollments count minus the total required students
        @course_enrollment_count = @course.enrollments.all_student.count
        @num_needed = @num_students - @course_enrollment_count
        
        
        j = 0
        while(j < @num_students && j < @num_needed)
          
          @student_id = rand(8999999999)+1000000000
          #
          # Make sure student_id is unique
          while (Pseudonym.find_by_unique_id(@student_id) != nil)
            @student_id = rand(8999999999)+1000000000
          end
          @student = User.create!
          @student_number = (j + @course_enrollment_count + 1).to_s
          #
          # the the user have a 4 digit number ie: 0001
          while (@student_number.length < 4)
            @student_number.insert(0, '0')
          end
          
          @student.name = @student_id
          @student.sortable_name = @course_title + @student_number
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
   #       @roster.users << @student
        
          j += 1
        end
        i += 1
      end
      
      flash[:notice] = "#{@num_needed} students generated."
      
      
#      @roster.save!
      
      redirect_to @roster
#      render :action => "show", :id => @roster.id
      
      
    end
  end
  
  def show
    if (!AssessmentQuestionBank.nil?)
      @quiz = AssessmentQuestionBank.first
      if is_authorized_action?(@quiz, @current_user, :create)
        @can_generate_assessment = true
      end
    end
    
    if (@can_generate_assessment == false)
      redirect_back_or_default(dashboard_url)
    end
    
    
    get_context
    @current_roster = Roster.find(params[:id])
    
    add_crumb("Rosters", rosters_path)
    add_crumb(@current_roster.name)
    

  end

end