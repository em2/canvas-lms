require([
  'jquery' /* $ */
], function($) {
   $(document).ready(function() {
   	


//*******************************************
//
// To edit the misconception name
//
//*******************************************

  $(".delete_misconception_link").click(function(event) {
    event.preventDefault();
    $(this).parents(".misconception").confirmDelete({
      url: $(this).attr('href'),
      message: "Are you sure you want to delete this misconception?",
      success: function() {
        $(this).slideUp(function() {
          $(this).remove();
        });
      }
    });
  });


  $(".edit_misconception_name_link").click(function(event) {
    event.preventDefault();
    var $misconception_piece = $(this).parents(".misconception_piece");
    $misconception_piece.removeClass('dont_save');
    var data = $misconception_piece.getTemplateData({textValues: ['name']});
    $misconception_piece.find(".header").hide();
    $misconception_piece.find(".header_content").hide();
    $misconception_piece.find(".modify_buttons").hide();
    var $form = $("#edit_misconception_name_form");
    $misconception_piece.prepend($form.show());
    $form.attr('action', $(this).attr('href'));
    $form.attr('method', 'PUT');

    $form.fillFormData(data, {object_name: 'quiz_misconception'});
    $form.find(":input:visible:last").focus().select();
  });


  $("#edit_misconception_name_form .misconception_name_box").keycodes('return esc', function(event) {
    if(event.keyString == 'esc') {
      $(this).parents(".misconception_piece").addClass('dont_save')
      $(this).blur();
    } else if(event.keyString == 'return') {
      $("#edit_misconception_name_form").submit();
    }
  });
  $("#edit_misconception_name_form .misconception_name_box").blur(function() {
    var $misconception_piece = $(this).parents(".misconception_piece");
    if(!$misconception_piece.hasClass('dont_save') && !$misconception_piece.hasClass('save_in_progress')) {
      $("#edit_misconception_name_form").submit();
      return;
    }
    
    $misconception_piece.find(".header").show();
    $misconception_piece.find(".header_content").show();
    $misconception_piece.find(".modify_buttons").show();
    $("body").append($("#edit_misconception_name_form").hide());
  });
  $("#edit_misconception_name_form").formSubmit({
    object_name: 'quiz_misconception',
    beforeSubmit: function(data) {
      var $misconception_piece = $(this).parents(".misconception_piece");
      $misconception_piece.attr('id', 'misconception_adding');
      try {
        $misconception_piece.addClass('save_in_progress')
        $misconception_piece.find(".misconception_name_box").blur();
      } catch(e) { }
      $misconception_piece.fillTemplateData({
        data: data
      });
      $misconception_piece.loadingImage();
      return $misconception_piece;
    },
    success: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress')
      var misconception_piece = data.quiz_misconception || data.assessment_misconception;
      misconception_piece.last_updated_at = $.parseFromISO(misconception_piece.updated_at).datetime_formatted;
      $misconception_piece.fillTemplateData({
        data: misconception_piece,
        hrefValues: ['id']
      })
    },
    error: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress')
      $misconception_piece.find(".edit_misconception_name_link").click();
      $("#edit_misconception_name_form").formErrors(data);
    }
  });








//*******************************************
//
// To edit the misconception explanation url
//
//*******************************************


  $(".edit_misconception_url_link").click(function(event) {
    event.preventDefault();
    var $misconception_piece = $(this).parents(".misconception_piece");
    $misconception_piece.removeClass('dont_save');
    var data = $misconception_piece.getTemplateData({textValues: ['explanation_url']});
    $misconception_piece.find(".header").hide();
    $misconception_piece.find(".header_content").hide();
    $misconception_piece.find(".modify_buttons").hide();
    var $form = $("#edit_misconception_url_form");
    $misconception_piece.prepend($form.show());
    $form.attr('action', $(this).attr('href'));
    $form.attr('method', 'PUT');

    $form.fillFormData(data, {object_name: 'quiz_misconception'});
    $form.find(":input:visible:last").focus().select();
  });


  $("#edit_misconception_url_form .misconception_url_box").keycodes('return esc', function(event) {
    if(event.keyString == 'esc') {
      $(this).parents(".misconception_piece").addClass('dont_save')
      $(this).blur();
    } else if(event.keyString == 'return') {
      $("#edit_misconception_url_form").submit();
    }
  });
  $("#edit_misconception_url_form .misconception_url_box").blur(function() {
    var $misconception_piece = $(this).parents(".misconception_piece");
    if(!$misconception_piece.hasClass('dont_save') && !$misconception_piece.hasClass('save_in_progress')) {
      $("#edit_misconception_url_form").submit();
      return;
    }
    
    $misconception_piece.find(".header").show();
    $misconception_piece.find(".header_content").show();
    $misconception_piece.find(".modify_buttons").show();
    $("body").append($("#edit_misconception_url_form").hide());
  });
  $("#edit_misconception_url_form").formSubmit({
    object_name: 'quiz_misconception',
    beforeSubmit: function(data) {
      var $misconception_piece = $(this).parents(".misconception_piece");
      $misconception_piece.attr('id', 'misconception_adding');
      try {
        $misconception_piece.addClass('save_in_progress')
        $misconception_piece.find(".misconception_url_box").blur();
      } catch(e) { }
      $misconception_piece.fillTemplateData({
        data: data
      });
      $misconception_piece.loadingImage();
      return $misconception_piece;
    },
    success: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress')
      var misconception_piece = data.quiz_misconception || data.assessment_misconception;
      misconception_piece.last_updated_at = $.parseFromISO(misconception_piece.updated_at).datetime_formatted;
      $misconception_piece.fillTemplateData({
        data: misconception_piece,
        hrefValues: ['id']
      })
    },
    error: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress')
      $misconception_piece.find(".edit_misconception_url_link").click();
      $("#edit_misconception_url_form").formErrors(data);
    }
  });






//*******************************************
//
// To edit the misconception description
//
//*******************************************


  $(".edit_misconception_description_link").click(function(event) {
    event.preventDefault();
    var $misconception_piece = $(this).parents(".misconception_piece");
    $misconception_piece.removeClass('dont_save');
    var data = $misconception_piece.getTemplateData({textValues: ['description']});
    $misconception_piece.find(".header").hide();
    $misconception_piece.find(".header_content").hide();
    $misconception_piece.find(".modify_buttons").hide();
    var $form = $("#edit_misconception_description_form");
    $misconception_piece.prepend($form.show());
    $form.attr('action', $(this).attr('href'));
    $form.attr('method', 'PUT');

    $form.fillFormData(data, {object_name: 'quiz_misconception'});
    $form.find(":input:visible:last").focus().select();
  });


  $("#edit_misconception_description_form .misconception_description_box").keycodes('return esc', function(event) {
    if(event.keyString == 'esc') {
      $(this).parents(".misconception_piece").addClass('dont_save')
      $(this).blur();
    } else if(event.keyString == 'return') {
      $("#edit_misconception_description_form").submit();
    }
  });
  $("#edit_misconception_description_form .misconception_description_box").blur(function() {
    var $misconception_piece = $(this).parents(".misconception_piece");
    if(!$misconception_piece.hasClass('dont_save') && !$misconception_piece.hasClass('save_in_progress')) {
      $("#edit_misconception_description_form").submit();
      return;
    }
    
    $misconception_piece.find(".header").show();
    $misconception_piece.find(".header_content").show();
    $misconception_piece.find(".modify_buttons").show();
    $("body").append($("#edit_misconception_description_form").hide());
  });
  $("#edit_misconception_description_form").formSubmit({
    object_name: 'quiz_misconception',
    beforeSubmit: function(data) {
      var $misconception_piece = $(this).parents(".misconception_piece");
      $misconception_piece.attr('id', 'misconception_adding');
      try {
        $misconception_piece.addClass('save_in_progress')
        $misconception_piece.find(".misconception_description_box").blur();
      } catch(e) { }
      $misconception_piece.fillTemplateData({
        data: data
      });
      $misconception_piece.loadingImage();
      return $misconception_piece;
    },
    success: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress')
      var misconception_piece = data.quiz_misconception || data.assessment_misconception;
      misconception_piece.last_updated_at = $.parseFromISO(misconception_piece.updated_at).datetime_formatted;
      $misconception_piece.fillTemplateData({
        data: misconception_piece,
        hrefValues: ['id']
      })
    },
    error: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress')
      $misconception_piece.find(".edit_misconception_description_link").click();
      $("#edit_misconception_description_form").formErrors(data);
    }
  });



//*******************************************
//
// To edit the Highly Likely misconception limit
//
//*******************************************


  $(".edit_misconception_limit_hp_link").click(function(event) {
    event.preventDefault();
    var $misconception_piece = $(this).parents(".misconception_piece");
    $misconception_piece.removeClass('dont_save');
    var data = $misconception_piece.getTemplateData({textValues: ['high_probability_limit']});
    $misconception_piece.find(".header").hide();
    $misconception_piece.find(".header_content").hide();
    $misconception_piece.find(".modify_buttons").hide();
    var $form = $("#edit_misconception_hp_limit_form");
    var hp_limit_id = parseInt($misconception_piece.find('.edit_misconception_limit_hp_link').attr('data-id'));
    $form.find('#quiz_misconception_limit_high_probability_id').val(hp_limit_id);
    $misconception_piece.prepend($form.show());
    $form.attr('action', $(this).attr('href'));
    $form.attr('method', 'PUT');

    $form.fillFormData(data, {object_name: 'quiz_misconception_limit'});
    $form.find(":input:visible:last").focus().select();
  });


  $("#edit_misconception_hp_limit_form .misconception_limit_box").keycodes('return esc', function(event) {
    if(event.keyString == 'esc') {
      $(this).parents(".misconception_piece").addClass('dont_save')
      $(this).blur();
    } else if(event.keyString == 'return') {
      $("#edit_misconception_hp_limit_form").submit();
    }
  });
  $("#edit_misconception_hp_limit_form .misconception_limit_box").blur(function() {
    var $misconception_piece = $(this).parents(".misconception_piece");
    if(!$misconception_piece.hasClass('dont_save') && !$misconception_piece.hasClass('save_in_progress')) {
      $("#edit_misconception_hp_limit_form").submit();
      return;
    }
    
    $misconception_piece.find(".header").show();
    $misconception_piece.find(".header_content").show();
    $misconception_piece.find(".modify_buttons").show();
    $("body").append($("#edit_misconception_hp_limit_form").hide());
  });
  $("#edit_misconception_hp_limit_form").formSubmit({
    object_name: 'quiz_misconception',
    beforeSubmit: function(data) {
      var $misconception_piece = $(this).parents(".misconception_piece");
      $misconception_piece.attr('id', 'misconception_adding');
      var limit = parseFloat(data["quiz_misconception_limit[high_probability_limit]"]);
      data["high_probability_limit"] = limit;
      try {
        $misconception_piece.addClass('save_in_progress')
        $misconception_piece.find(".misconception_limit_box").blur();
      } catch(e) { }
      $misconception_piece.fillTemplateData({
        data: data
      });
      $misconception_piece.loadingImage();
      return $misconception_piece;
    },
    success: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress');
      var misconception_piece = data.quiz_misconception_probability || data.assessment_misconception_probability;
      misconception_piece.last_updated_at = $.parseFromISO(misconception_piece.updated_at).datetime_formatted;
      $misconception_piece.fillTemplateData({
        data: misconception_piece,
        hrefValues: ['id']
      })
    },
    error: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress');
      $misconception_piece.find(".edit_misconception_limit_hp_link").click();
      $("#edit_misconception_hp_limit_form").formErrors(data);
    }
  });









//*******************************************
//
// To edit the Somewhat Likely misconception limit
//
//*******************************************


  $(".edit_misconception_limit_sp_link").click(function(event) {
    event.preventDefault();
    var $misconception_piece = $(this).parents(".misconception_piece");
    $misconception_piece.removeClass('dont_save');
    var data = $misconception_piece.getTemplateData({textValues: ['somewhat_probability_limit']});
    $misconception_piece.find(".header").hide();
    $misconception_piece.find(".header_content").hide();
    $misconception_piece.find(".modify_buttons").hide();
    var $form = $("#edit_misconception_sp_limit_form");
    var sp_limit_id = parseInt($misconception_piece.find('.edit_misconception_limit_sp_link').attr('data-id'));
    $form.find('#quiz_misconception_limit_somewhat_probability_id').val(sp_limit_id);
    $misconception_piece.prepend($form.show());
    $form.attr('action', $(this).attr('href'));
    $form.attr('method', 'PUT');

    $form.fillFormData(data, {object_name: 'quiz_misconception_limit'});
    $form.find(":input:visible:last").focus().select();
  });


  $("#edit_misconception_sp_limit_form .misconception_limit_box").keycodes('return esc', function(event) {
    if(event.keyString == 'esc') {
      $(this).parents(".misconception_piece").addClass('dont_save')
      $(this).blur();
    } else if(event.keyString == 'return') {
      $("#edit_misconception_sp_limit_form").submit();
    }
  });
  $("#edit_misconception_sp_limit_form .misconception_limit_box").blur(function() {
    var $misconception_piece = $(this).parents(".misconception_piece");
    if(!$misconception_piece.hasClass('dont_save') && !$misconception_piece.hasClass('save_in_progress')) {
      $("#edit_misconception_sp_limit_form").submit();
      return;
    }
    
    $misconception_piece.find(".header").show();
    $misconception_piece.find(".header_content").show();
    $misconception_piece.find(".modify_buttons").show();
    $("body").append($("#edit_misconception_sp_limit_form").hide());
  });
  $("#edit_misconception_sp_limit_form").formSubmit({
    object_name: 'quiz_misconception',
    beforeSubmit: function(data) {
      var $misconception_piece = $(this).parents(".misconception_piece");
      $misconception_piece.attr('id', 'misconception_adding');
      var limit = parseFloat(data["quiz_misconception_limit[somewhat_probability_limit]"]);
      data["somewhat_probability_limit"] = limit;
      try {
        $misconception_piece.addClass('save_in_progress')
        $misconception_piece.find(".misconception_limit_box").blur();
      } catch(e) { }
      $misconception_piece.fillTemplateData({
        data: data
      });
      $misconception_piece.loadingImage();
      return $misconception_piece;
    },
    success: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress');
      var misconception_piece = data.quiz_misconception_probability || data.assessment_misconception_probability;
      misconception_piece.last_updated_at = $.parseFromISO(misconception_piece.updated_at).datetime_formatted;
      $misconception_piece.fillTemplateData({
        data: misconception_piece,
        hrefValues: ['id']
      })
    },
    error: function(data, $misconception_piece) {
      $misconception_piece.loadingImage('remove');
      $misconception_piece.removeClass('save_in_progress');
      $misconception_piece.find(".edit_misconception_limit_sp_link").click();
      $("#edit_misconception_sp_limit_form").formErrors(data);
    }
  });










  });
 });