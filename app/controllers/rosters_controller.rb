class RostersController < ApplicationController
  def index
    get_context
    add_crumb("School Rosters")
    
    @rosters = Roster.all
    
    verify_auth()
    
  end
  
  #########################################################################
  #
  # create will generate all the districts, schools, teachers, and students
  #
  #########################################################################
  def create
    
    #
    # While creating everything, this bool flag will be set if any errors are encountered
    # If any are found at the beginning, send the user back to their dashboard
    # Otherwise at the end if any were found while creating districts/schools, we can send a message to the user
    errors_found = false
    
    #
    # Make sure that the stage was selected
    if (params[:rosters][:stage] == nil)
      errors_found = true
    end
    
    #
    # Make sure that the instance is 3 numbers and only 3 numbers
    instance_correct = false
    if (params[:rosters][:instance].size == 3)
      if (params[:rosters][:instance][/[0-9]*/].size == 3)
        instance_correct = true
      end
    end
    
    if (!instance_correct)
      errors_found = true
    end
    
    #
    # Make sure that the stage and instance were entered and entered correctly
    if (errors_found)
      flash[:notice] = "Please complete the form."
      redirect_back_or_default(dashboard_url)
    else
      #
      # @total_students_created holds just what it says
      @total_students_created = 0;
      
      
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
      # Create the Roster
      @roster = Roster.new
      
      i = 0
      while (i < @course_titles.count)
        @course_title = @course_titles[i]
        
        #
        # Make sure that the course title is valid.
        if (@course_title[/[Dd][0-9]{3}[Ss][0-9]{3}[Tt][0-9]{3}[Cc][0-9]{3}/] == nil || @course_title.size != 16)
          i += 1
          errors_found = true
          next
        end
        
        #
        # Pull out all the names using regex.
        @district = @course_title[/[Dd][0-9]{3}/]
        @school = @course_title[/[Ss][0-9]{3}/]
        @class = @course_title[/[Cc][0-9]{3}/]
        @teacher = @course_title[/[Tt][0-9]{3}/]
        
        #
        # Try to find the district. If unsuccessful, then create one.
        if (!@district_account = Account.find_by_name(@district))
          @district_account = Account.create!(:name => @district, :parent_account => @context)
        end
        
        #
        # Try to find a school in that district with the same name.
        found_school = false
        @district_account.sub_accounts.each do |school|
          if (school.name == @school)
            found_school = true
            @school_account = school
            @roster = Roster.find_by_name(@district + @school)
          end
        end
        
        #
        # If that was unsuccessful, go ahead and create a new school and roster for that school.
        if (!found_school)
          @school_account = Account.create!(:name => @school, :parent_account => @district_account)
          @roster.name = @district + @school
          @roster.account = @school_account
          @roster.save!
        end
        
        #
        # Try to find the course. If unsuccessful, then create the Course.
        if (!@course = Course.find_by_name(@course_title))
          @course = Course.create!(:name => @course_title, :course_code => @course_title, :account => @school_account)
          @course.offer!
          @course.save!
        end
        

        #
        # Try to find the teacher
        # Go through each school and look for a teacher with the same name
        # if unsuccessful, go ahead and create that teacher
        teacher_found = false
        @school_account.courses.each do |course|
          course.enrollments.all_admin.each do |admin|
            if (User.find(admin.user_id).sortable_name == @teacher)
              teacher_found = true
              @teacher_account = User.find(admin.user_id)
            end
          end
        end
        
        #
        # If the teacher was not found, create that teacher
        if (!teacher_found)
          @teacher_id = rand(8999999999)+1000000000
          #
          # Make sure student_id is unique
          while (Pseudonym.find_by_unique_id(@teacher_id) != nil)
            @teacher_id = rand(8999999999)+1000000000
          end
          
          @teacher_account = User.create!
          @teacher_account.name = @teacher_id
          @teacher_account.sortable_name = @teacher
          @teacher_account.short_name = @teacher
          @teacher_account.browser_locale = 'en'
          
          #
          # pseudonym is what stores the users login information, let's build it
          @pseudonym = @teacher_account.pseudonyms.build(:account => @context)
          @pseudonym.user = @teacher_account
          @pseudonym.unique_id = @teacher_id
          @pseudonym.account = @context
          @pseudonym.workflow_state = 'active'
          
          alphas = [('A'..'Z'),('a'..'z')].map {|range| range.to_a}.flatten
          temp_password = (0...6).map { alphas[rand(alphas.size)] }.join
          
          @pseudonym.password = temp_password
          @pseudonym.password_confirmation = temp_password
          @pseudonym.save_without_session_maintenance
          
          @teacher_account.register!
          @teacher_account.save!
          
        end
        
        #
        # Enroll the teacher in this course as a teacher
        @enroll=@course.enroll_teacher(@teacher_account)
        @enroll.workflow_state = 'active'
        @enroll.save!
        
        #
        # Enroll the current user as the teacher
        if (!@course.enrollments.find_by_user_id(@current_user.id))
          @enroll=@course.enroll_teacher(@current_user)
          @enroll.workflow_state = 'active'
          @enroll.save!
        end
        
        
        #
        # Make sure that the stage instance has not been used with this probe
        assignment_found = false
        @course.assignments.each do |assignment|
          temp_probe_name = @probe.title + @stage + @instance
          if (Quiz.find_by_assignment_id(assignment.id).probe_name == temp_probe_name)
            i += 1
            assignment_found = true
            errors_found = true
          end
        end
        
        
        if (!assignment_found)
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
          @quiz.anonymous_submissions = false
          @quiz.save!
          
          @course_assignment = Assignment.find(@quiz.assignment_id)
          @course_assignment.position = @course.assignments.count
          @course_assignment.save!
        end
        
        #
        # Create the students
        srand
        @num_students = params[:rosters][:students].to_i
        # calculate the number of extra students needed
        # course student enrollments count minus the total required students
        @course_enrollment_count = @course.enrollments.all_student.count
        @num_needed = @num_students - @course_enrollment_count
        @total_students_created += @num_needed
        
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
          
          @pseudonym.password = Canvas::Security.config["student_password"]
          @pseudonym.password_confirmation = Canvas::Security.config["student_password"]
          @pseudonym.save_without_session_maintenance
          
          @student.register!
          @student.save!
          
          @enroll = @course.enroll_student(@student)
          @enroll.workflow_state = 'active'
          @enroll.save!
          
          
          j += 1
        end
        i += 1
      end
      
      
      if (@roster.id)
        if (errors_found)
          flash[:notice] = "#{@total_students_created} students were generated. However, there were some errors in processing your request."
        else
          flash[:notice] = "#{@total_students_created} students were generated."
        end
        redirect_to roster_path(@roster)
      else
        flash[:notice] = "There were some errors in processing your request."
        redirect_back_or_default(dashboard_url)
      end
      
      
    end
  end
  
  def show
    
    verify_auth()
    
    get_context
    @current_school_roster = Roster.find(params[:id]).account
    
    add_crumb("Rosters", rosters_path)
    add_crumb(@current_school_roster.parent_account.name + @current_school_roster.name)
    
  end
  
  def verify_auth
    @can_generate_assessment = false
    if (!Quiz.nil?)
      @quiz = Quiz.first
      if is_authorized_action?(@quiz, @current_user, :create)
        @can_generate_assessment = true
      end
    end
    
    if (@can_generate_assessment == false)
      flash[:notice] = "Not authorized."
      redirect_back_or_default(dashboard_url)
    end
  end

end
