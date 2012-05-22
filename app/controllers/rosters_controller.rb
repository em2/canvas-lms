class RostersController < ApplicationController
  

  def index
    if authorized_action(Course.create.quizzes.new, @current_user, :delete) # Make sure the user is authorized to do this
      get_context
      add_crumb("School Rosters")
      
      @rosters = Roster.by_name
    end    
  end
  
  #########################################################################
  #
  # create will generate all the districts, schools, teachers, and students
  #
  #########################################################################
  def create

    #
    # get the current context
    # in this case it should usually be the domain_root_account
    # but I left the other stuff in as Canvas does it's own thing sometimes...
    get_context
    @context = @domain_root_account || Account.default unless @context.is_a?(Account)
    @context = @context.root_account || @context
    
    #
    # While creating everything, this bool flag will be set if any errors are encountered
    # If any are found at the beginning, send the user back to their dashboard
    # Otherwise at the end if any were found while creating districts/schools, we can send a message to the user
    errors_found = false

    #
    # Make sure that the stage was selected
    if check_stage(params[:rosters][:stage])
      errors_found = true
    end
    
    #
    # Make sure that the instance is 3 numbers and only 3 numbers
    if !check_instance(params[:rosters][:instance])
      errors_found = true
    end

    #
    # Make sure that the student count correct if the 'Other' option was selected
    if !check_student_count(params[:rosters][:students], params[:rosters][:students_custom])
      errors_found = true
    end

    if authorized_action(Course.create.quizzes.new, @current_user, :delete) # Make sure the user is authorized to do this
      if (errors_found) # Make sure that the stage and instance were entered and entered correctly
        flash[:error] = "Please complete the form."
        redirect_back_or_default(dashboard_url)
        return false
      else
        #
        # Create the names
        @probe = AssessmentQuestionBank.find(params[:rosters][:probe_id])
        @instance = params[:rosters][:instance]
        @stage = params[:rosters][:stage]
        @course_titles = params[:rosters][:courses].split(/[\r\n\t\,\; ]+/)

        #
        # probe_generated is so we know if a probe is generated during the while loop
        # There may be a case where the user only entered one class id and there was a
        # problem with that one id. We will exit the following loop prematurely and thus no
        # probes have been generated.
        probe_generated = false

        #
        # Loop until a probe has been generated for each class id
        i = 0
        while (i < @course_titles.count)
          
          #
          # Create the Roster
          @roster = Roster.new

          @course_title = @course_titles[i]
          
          #
          # Make sure that the course title is valid.
          if check_course_id(@course_title)
            i += 1
            errors_found = true
            next
          end
          
          #
          # Pull out all the names using regex.
          extract_names(@course_title)
          
          #
          # Try to find the district. If unsuccessful, then create one.
          if (!@district_account = Account.find_by_name(@district))
            @district_account = Account.create!(:name => @district, :parent_account => @context)
          end
          
          #
          # Try to find a school in that district with the same name.
          # If that was unsuccessful, go ahead and create a new school and roster for that school.
          if !find_school()
            create_school()
          end


          #
          # Send off the roster to generate everything to delayed_job
          #Delayed::Job.enqueue(RosterGenerateJob.new(@roster, @context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher))
          #@roster.send_later(:generate_probes, @context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher)
          @roster.generate_probes(@context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher)
          
          probe_generated = true

          i += 1
        end

        if (errors_found && probe_generated)
          flash[:error] = "There were some errors. However, I am attempting to generate the probes..."
        elsif (errors_found && !probe_generated)
          flash[:error] = "There were some errors and no probes have been generated."
        elsif (probe_generated)
          flash[:notice] = "Attempting to generate the probes..."
        end
        redirect_back_or_default(dashboard_url)
        return true

      end
    end
  end
  
  def show
    
    if authorized_action(Course.create.quizzes.new, @current_user, :delete) # Make sure the user is authorized to do this
      get_context
      @current_school_roster = Roster.find(params[:id]).account
      
      add_crumb("Rosters", rosters_path)
      add_crumb(@current_school_roster.parent_account.name + @current_school_roster.name)
    end    
  end

  def check_stage(stage)
    if (stage == nil)
      return true
    end
    return false
  end

  def check_instance(instance)
    instance_correct = false
    if (instance != nil && instance.size == 3)
      if (instance[/[0-9]*/].size == 3)
        instance_correct = true
      end
    end
    return instance_correct
  end

  def check_student_count(temp_students, temp_students_custom)
    student_count_correct = false
    if (temp_students == "Other")
      if (temp_students_custom != nil && temp_students_custom.size > 0 && temp_students_custom[/[0-9]*/].size == temp_students_custom.size && temp_students_custom.to_i > 0 && temp_students_custom.to_i <= 250)
        student_count_correct = true
        @number_students = temp_students_custom.to_i
      end
    else
      @number_students = temp_students.to_i
      student_count_correct = true
    end
    return student_count_correct
  end
  
  def check_course_id(course_title)
    if (course_title[/[Dd][0-9]{3}[Ss][0-9]{3}[Tt][0-9]{3}[Cc][0-9]{3}/] == nil || course_title.size != 16)
      return true
    end
    return false
  end

  def extract_names(course_title)
    @district = course_title[/[Dd][0-9]{3}/]
    @school = course_title[/[Ss][0-9]{3}/]
    @teacher = course_title[/[Tt][0-9]{3}/]
    @class = course_title[/[Cc][0-9]{3}/]

    @district.capitalize!
    @school.capitalize!
    @teacher.capitalize!
    @class.capitalize!

    @course_title = @district + @school + @teacher + @class
  end

  def find_school
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
    return found_school
  end

  def create_school
    @school_account = Account.create!(:name => @school, :parent_account => @district_account)
    @roster.name = @district + @school
    @roster.account = @school_account
    @roster.workflow_state = "available"
    @roster.save!
  end

end
