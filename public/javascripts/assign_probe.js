

function assignProbeValidator(){
	validateInstance($('#rosters_instance').val());
	validateCourses($('#rosters_courses').val());
	$('#rosters_instance').change(function(){
		validateInstance(this.value);
	});
	
	function validateInstance(text){
		//
		// Check for correct length of the instance
		if (text.length == 3){
			//
			// now make sure they are all numbers
			if (text.match(/[0-9]*/)[0].length == 3){
				$('#instance_validator').hide();
				return false;
			}
			else{
				$('#instance_validator').show();
				return true;
			}
		}
		else{
			$('#instance_validator').show();
			return true;
		}
	}
	
	$('#rosters_courses').change(function(){
		validateCourses(this.value);
	});
	
	function validateCourses(text){
		var course_titles = text.split(/[\r\n\t\,\; ]+/);
		
		//
		// loop through each course title and and find any that are not valid
		for (var i=0; i<course_titles.length; i++){
			if (course_titles[i].length != 16 || course_titles[i].match(/[Dd][0-9]{3}[Ss][0-9]{3}[Tt][0-9]{3}[Cc][0-9]{3}/) == null){
				$('#courses_text_validator').show();
				$('#courses_example_A_validator').show();
				$('#courses_example_B_validator').show();
				return true;
			}
		}
		
		//
		// if we reach this code, then we are valid and good to go
		$('#courses_text_validator').hide();
		$('#courses_example_A_validator').hide();
		$('#courses_example_B_validator').hide();
		return false;
	}
	
	$('#rosters_submit').click(function(event){
		var dirty = true;
		if (validateInstance($('#rosters_instance').val()) == false){
			if (validateCourses($('#rosters_courses').val()) == false){
				dirty = false;
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