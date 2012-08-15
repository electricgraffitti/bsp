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