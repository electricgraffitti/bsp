// ctrl + alt + f for quick formatter

var Navigation = {

  setCurrentNav: function() {
    var url = location.pathname,
        all_links = $('ul#main_nav li'),
        current_link = $('ul#main_nav li a[href$="' + url + '"]'),
        active_link = current_link.parent("li");

    if (url == "/") {
      all_links.removeClass('active');
      $('.home').addClass('active');
    } else {
      all_links.removeClass('active');
      active_link.addClass('active');
    }
  }
};

var Gateway = {
  
  formSubmit: function(form) {
    $("#new_pledge").submit(function(event) {
      var submitButton = $(this).find(".submit-button"),
          actionsDiv = $(this).find(".actions");

          $("#submit_error_message").remove();
          $(".actions p").remove();
          event.preventDefault();
          Gateway.stripeVerify($(this));
          FormFuncs.disableSubmitButton(submitButton);
    });
  },

  stripeVerify: function(stripeForm) {
    var self = stripeForm,
        cardNumber = self.find("#credit_card_card_number").val(),
        cardCvc = self.find("#credit_card_verification_value").val(),
        cardMonth = self.find("#credit_card_month").val(),
        cardYear = self.find("#credit_card_year").val(),
        amount = ($("#pledge_amount").val() * 100); // Stripe expects amount to be in cents

      if (cardNumber.length) {
          // Submit Values to Stripe for auth
          Stripe.createToken({
            number: cardNumber,
            cvc: cardCvc,
            exp_month: cardMonth,
            exp_year: parseInt(cardYear)
          }, Gateway.stripeResponseHandler);
      } else {
        return false;
      }
  },

  stripeResponseHandler: function(status, response) {
    if (status == 200) {
      $('#pledge_stripe_card_token').val(response.id)
      $('#new_pledge')[0].submit();
    } else {
      //$('#error_message').text(response.error.message);
      $('.submit-button').attr('disabled', false);
      $('.submit-button').removeClass('disabled');
      $(".actions p").remove();
      $(".actions").append("<div id='submit_error_message' class='red'>" + response.error.message + "</div>");
    }
  }

};

var FormFuncs = {

  validatePledgeForm: function(attribute) {
    $("#new_pledge").bind('fieldIsInvalid', function(event, form, el) {
      el.focus();
    }).ketchup();
    $("input[type='submit']", "#new_pledge").on("click", function(e) {
      if (FormFuncs.validateCartFields() == true) {
        if( $('#new_pledge').ketchup("isValid") ) {
          Gateway.formSubmit();
        }
      } else {
        e.preventDefault();
        alert("Your pledge value must be numeric.");
      }
    });    
  },

  disableSubmitButton: function(submitButton) {
    $(".actions").append(Ajax.ajaxIcon);
    submitButton.attr("disabled", "disabled");
    submitButton.addClass("disabled");
  },

  validateCartFields: function() {
    var isValid = Utility.isNumeric($("#pledge_amount").val());
    return isValid;
  }

};

var VidPlayer = {

  initTrailerLink: function() {
    var playTrailerLink = $(".play_trailer");

    playTrailerLink.on("click", function(e) {
      e.preventDefault();
      VidPlayer.launchModalPlayer();
    });
  },

  launchModalPlayer: function() {
    var expose = $("<div id='expose'></div>"),
        playerWindow = $("<div id='player_window'><div id='close_link'></div><iframe src='http://player.vimeo.com/video/47545749' width='580' height='326' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>");

    // playerWindow = $("<div id='player_window'><div id='close_link'></div><div id='player'></div></div>"); Old Player
    // videoPlayer.find("source").attr("src", "");    
    // videoPlayer.find("source").attr("src", "https://s3.amazonaws.com/imagineassets/generalvideos/bsp_demo_reel_2_july.mp4");
    // playerWindow.append(videoPlayer);
    expose.append(playerWindow);
    VidPlayer.injectPlayer(playerWindow, expose);
    Video.playFlashVideo();
  },

  injectPlayer: function(playerWindow, expose) {
    if ($(window).height() < 1024) {
      playerWindow.addClass("dynamic_height");
      $("body").append(expose);
    } else {
      $("body").append(expose);
    }
  },

  closeVideoModal: function() {
     var closeVideoLink = $("#close_link");

     closeVideoLink.on("click", function() {
      $("#expose").remove();
     });
  }

};

//**********Initialize Document**********//
$(document).ready(function() {
  //Ajax.ajaxStatus();
  Navigation.setCurrentNav();
  VidPlayer.initTrailerLink();
});