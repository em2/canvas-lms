class RostersController < ApplicationController
  def index
    get_context
    add_crumb("School Rosters")
    
    @rosters = Roster.by_name
    
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
    # Make sure that the student count correct if the 'Other' option was selected
    temp_students = params[:rosters][:students]

    student_count_correct = false
    if (temp_students == "Other")
      temp_students_custom = params[:rosters][:students_custom]
      if (temp_students_custom.size > 0 && temp_students_custom[/[0-9]*/].size == temp_students_custom.size && temp_students_custom.to_i > 0 && temp_students_custom.to_i <= 250)
        student_count_correct = true
        @num_students = temp_students_custom.to_i
      end
    else
      @num_students = temp_students.to_i
      student_count_correct = true
    end

    if (!student_count_correct)
      errors_found = true
    end

    
    #
    # Make sure that the stage and instance were entered and entered correctly
    if (errors_found)
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
      #@term = @context.enrollment_terms.active[-1]
      
      #
      # Create the names
      @probe = AssessmentQuestionBank.find(params[:rosters][:probe])
      @instance = params[:rosters][:instance]
      @stage = params[:rosters][:stage]
      @course_titles = params[:rosters][:courses].split(/[\r\n\t\,\; ]+/)
      
      
     
      
      i = 0
      while (i < @course_titles.count)
        
        #
        # Create the Roster
        @roster = Roster.new

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
          if (school.name == @school && school.workflow_state == "active")
            found_school = true
            @school_account = school
            @roster = Roster.find_by_name(@district + @school)
            if (@roster.workflow_state != "available")
              @roster.workflow_state = "available"
              @roster.save!
            end
          end
        end
        
        #
        # If that was unsuccessful, go ahead and create a new school and roster for that school.
        if (!found_school)
          @school_account = Account.create!(:name => @school, :parent_account => @district_account)
          @roster.name = @district + @school
          @roster.account = @school_account
          @roster.workflow_state = "available"
          @roster.save!
        end

        #
        # Send off the roster to generate everything to delayed_job
        #Delayed::Job.enqueue(RosterGenerateJob.new(@roster, @context, @probe, @instance, @stage, @course_title, @current_user, @num_students, @district, @district_account, @school_account, @teacher))
        @roster.send_later(:generate_probes, @context, @probe, @instance, @stage, @course_title, @current_user, @num_students, @district, @district_account, @school_account, @teacher)
        #@roster.generate_probes(@context, @probe, @instance, @stage, @course_title, @current_user, @num_students, @district, @district_account, @school_account, @teacher)
        
        i += 1
      end
      
      flash[:notice] = "Your probes are being generated."
      redirect_back_or_default(dashboard_url)

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
