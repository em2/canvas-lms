class RostersController < ApplicationController
  before_filter :require_user

  def index
    if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this

      add_crumb("School Rosters")

      @rosters = Roster.by_name

      @courses = []

      @rosters.each do |roster|

        if roster.account.courses.are_available.count > 0
          @found_teacher = false
          roster.account.courses.by_name_available.each do |course|
            course.teachers.each do |teacher|
              if (teacher.id == @current_user.id)
                @found_teacher = true
                break
              end
              if @found_teacher
                break
              end
            end
            if @found_teacher
              break
            end
          end
          if (@found_teacher || @is_admin)
            @courses << roster
          end
        end
      end

      #############################
      # This is a sucky way to get the tabs into roster, need to refactor with something else
      if !@report = Report.find_by_account_id(@context.id)
        @report = Report.create!(:account_id => @context.id, :calculation_count => 0, :in_job => false)
      end

      @context = @report
      @active_tab = "rosters"
      ##############################
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end
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

    if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this
      if (errors_found) # Make sure that the stage and instance were entered and entered correctly
        flash[:error] = "Please complete the form."
        redirect_back_or_default(dashboard_url)
        return false
      else
        #
        # Create the names
        @probe = AssessmentQuestionBank.find(params[:rosters][:probe_id])
        @pre_post = params[:rosters][:pre_post].present? ? params[:rosters][:pre_post] : ""
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
          #find course
          if @course = Course.find_by_em2_identifier(@course_title)
            @course_id = @course.id
            @school_account = Account.find(@course.account_id)
            @district_account = @school_account.parent_account
            if @school_account.roster
              @roster = @school_account.roster
              if (@roster.workflow_state != "available")
                @roster.workflow_state = "available"
                @roster.save!
              end
            else
              @roster.name = @district + @school
              @roster.account = @school_account
              @roster.workflow_state = "available"
              @roster.save!
            end

            #
            # Send off the roster to generate everything to delayed_job
            Delayed::Job.enqueue(RosterGenerateJob.new(@roster, @context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher, @pre_post, @course_id))
            #@roster.send_later(:generate_probes, @context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher, @pre_post, @course_id)
            # @roster.generate_probes(@context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher, @pre_post, @course_id)

            probe_generated = true
          else
            errors_found = true
          end

          i += 1
        end

        if (errors_found && probe_generated)
          flash[:error] = "There were some errors. However, I am attempting to generate the probes..."
        elsif (errors_found && !probe_generated)
          flash[:error] = "There were some errors and no probes have been generated."
        elsif (probe_generated)
          flash[:error] = "Adding assessment. This could take up to 5 minutes. Please be patient."
        end
        redirect_back_or_default(dashboard_url)
        return true

      end
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
    end
  end

  def show
    if is_authorized?(@current_user) && is_admin_or_teacher? # Make sure the user is authorized to do this
      @roster = Roster.find(params[:id])
      @current_school_roster = @roster.account

      add_crumb("Rosters", rosters_path)
      add_crumb(@current_school_roster.parent_account.name + @current_school_roster.name)
      @context = @roster
      @active_tab = "rosters"
    else
      flash[:error] = "Not Authorized!"
      redirect_back_or_default(dashboard_url)
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


  def old_generate_probe
    if (@current_user.permanent_name_identifier == @district + @teacher || @is_admin)

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
      Delayed::Job.enqueue(RosterGenerateJob.new(@roster, @context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher))
      #@roster.send_later(:generate_probes, @context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher)
      #@roster.generate_probes(@context, @probe, @instance, @stage, @course_title, @current_user, @number_students, @district, @district_account, @school_account, @teacher)

      probe_generated = true
    else
      errors_found = true
    end
  end

end
