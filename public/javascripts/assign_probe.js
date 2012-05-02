

//
// assignProbeValidator() handles validating all the form data
// for assigning probes
function assignProbeValidator(){

	//
	// validate everything on page load so that the warning messages
	// will display from the start
	validateInstance($('#rosters_instance').val());
	validateCourses($('#rosters_courses').val());
	checkStudents($('#rosters_students').val());
	validateStudentsCustom($('#rosters_students_custom').val());
	
	//
	// Watch the rosters_instance for changes
	$('#rosters_instance').change(function(){
		validateInstance(this.value);
	});
	
	//
	// validateInstance(string) will validate that the string
	// is of length 3 and if it is of length 3 it will
	// make sure all 3 places are numbers using regex
	// if string is 3 numbers returns false
	// if string is not returns true
	function validateInstance(text){
		//
		// Check for correct length of the instance
		if (text.length == 3){
			//
			// now make sure they are all numbers
			if (text.match(/[0-9]*/)[0].length == 3){
				$('#instance_validator').hide("hide");
				$('#rosters_instance').removeAttr("style", "border-color:red;");
				return false;
			}
			else{
				$('#instance_validator').show("hide");
				$('#rosters_instance').attr("style", "border-color:red;");
				return true;
			}
		}
		else{
			$('#instance_validator').show("fast");
			$('#rosters_instance').attr("style", "border-color:red;");
			return true;
		}
	}
	
	//
	// Watch the rosters_students for changes
	$('#rosters_students').change(function(){
		checkStudents(this.value);
	});
	
	//
	// checkStudents(string) will check that the string
	// if it is "Other" then it will enable the rosters_students_custom text field
	// and show the div it is wrapped in and validate the that field and returns true.
	// if it isn't "Other" then it will disable the rosters_students_custom text field
	// and hid the dive that it is wrapped in and returns false.
	function checkStudents(text){
		if (text == "Other"){
			$('#rosters_students_custom').removeAttr("disabled");
			$('#students_custom_count').show("fast");
			$('rosters_students_custom').focus();
			validateStudentsCustom($('#rosters_students_custom').val());
			return true;
		}
		else{
			$('#rosters_students_custom').attr("disabled", "disabled");
			$('#students_custom_count').hide("slow");
			return false;
		}
	}

	//
	// Watch rosters_students_custom for changes
	$('#rosters_students_custom').change(function(){
		validateStudentsCustom(this.value);
	});
	
	//
	// validateStudentsCustom(string) will validate that the
	// rosters_students has "Other" selected and that the string
	// actually contains something, and that something is all numbers
	// It then checks that number to make sure it isn't zero and is less than 251
	// and if that is true it hides the warning texts and returns false.
	// if it is zero, greater than 250 or non-numerical it shows the warning texts and returns true.-0i8=
	function validateStudentsCustom(text){
		//
		// Check for numbers
		if ($('#rosters_students').val() == "Other" && text.length > 0 && text.match(/[0-9]*/)[0].length == text.length){
			if (text > 0 && text <= 250){
				$('#students_custom_count_validator').hide("slow");
				$('#students_custom_count_zero_validator').hide("slow");
				$('#students_custom_count_less_validator').hide("slow");
				$('#rosters_students_custom').removeAttr("style", "border-color:red;");
				return false;
			}else if (text < 1){
				$('#students_custom_count_validator').hide("slow");
				$('#students_custom_count_less_validator').hide("slow");
				$('#students_custom_count_zero_validator').show("fast");
				$('#rosters_students_custom').attr("style", "border-color:red;");
				return true;
			}else{
				$('#students_custom_count_validator').hide("slow");
				$('#students_custom_count_zero_validator').hide("slow");
				$('#students_custom_count_less_validator').show("fast");
				$('#rosters_students_custom').attr("style", "border-color:red;");
				return true;
			}
		}
		else{
			$('#students_custom_count_validator').show("fast");
			$('#students_custom_count_zero_validator').hide("slow");
			$('#students_custom_count_less_validator').hide("slow");
			$('#rosters_students_custom').attr("style", "border-color:red;");
			return true;
		}
	}
	
	//
	// Watch rosters_courses for changes
	$('#rosters_courses').change(function(){
		validateCourses(this.value);
	});
	
	//
	// validateCourses(string) validates the string
	// if it does not meet the criteria it shows the warning text and returns true
	// otherwise it hides the warning text and returns false
	function validateCourses(text){
		var course_titles = text.split(/[\r\n\t\,\; ]+/);
		
		//
		// loop through each course title and and find any that are not valid
		for (var i=0; i<course_titles.length; i++){
			if (course_titles[i].length != 16 || course_titles[i].match(/[Dd][0-9]{3}[Ss][0-9]{3}[Tt][0-9]{3}[Cc][0-9]{3}/) == null){
				$('#course_example_validator').show("fast");
				$('#rosters_courses').attr("style", "border-color:red;");
				return true;
			}
		}
		
		//
		// if we reach this code, then we are valid and good to go
		$('#course_example_validator').hide("slow");
		$('#rosters_courses').removeAttr("style", "border-color:red;");
		return false;
	}
	
	//
	// Watch the submit button for a click
	// if all the fields check out good, then it allows the submit
	// otherwise it alerts the user to fix the errors and cancels the submit
	$('#rosters_submit').click(function(event){
		var dirty = true;
		if (validateInstance($('#rosters_instance').val()) == false){
			if (validateCourses($('#rosters_courses').val()) == false){
				if (validateStudentsCustom($('#rosters_students_custom').val()) == false){
					dirty = false;
				}
			}
		}
		
		if (dirty){
			alert("There are errors on the form. Please fix them.");
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	});
	
	

	
}