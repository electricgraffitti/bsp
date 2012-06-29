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
        playerWindow = $("<div id='player_window'><div id='close_link'></div></div>"),
        videoPlayer = Video.setupModalVideoPanelHtml();

    videoPlayer.find("source").attr("src", "https://s3.amazonaws.com/imagineassets/generalvideos/bsp_demo_reel_2.mp4");
    playerWindow.append(videoPlayer);
    expose.append(playerWindow);
    VidPlayer.injectPlayer(playerWindow, expose);
    Video.playModalVideo();
    VidPlayer.closeVideoModal();
  },

  injectPlayer: function(playerWindow, expose) {
    if ($(window).height() < 1024) {
      playerWindow.addClass("dynamic_height");
      $("body").append(expose);
    } else {
      $("body").append(expose);
    }
  },

  closeVideoModal: function(attribute){
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