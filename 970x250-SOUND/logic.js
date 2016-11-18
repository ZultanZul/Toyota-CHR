
// Reference to the creative's various properties and elements.
var creative = {};


/**
 * Called on the window load event.
 */
function preInit() {
  setupDom();

  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
}

/**
 * Set up references to DOM elements.
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.preloadShape = document.getElementById('preloadShape');
  creative.dom.exit = document.getElementById('exit');
  creative.dom.cta= document.getElementById('cta');

  var ctaHovered = false;
  var ctaHover = function(){
      if(ctaHovered){
          TweenMax.to(creative.dom.cta, 0.3,{borderColor: '#ffffff' ,ease:Power1.easeOut})
      } else {
          TweenMax.to(creative.dom.cta, 0.6,{borderColor: '#4c6be3' ,ease:Power1.easeOut})
      }
      ctaHovered = !ctaHovered;
  };
  creative.dom.exit.addEventListener('mouseover', ctaHover, false);
  creative.dom.exit.addEventListener('mouseout', ctaHover, false);

  creative.dom.video0 = {};
  creative.dom.video0.vidContainer = document.getElementById('video-container-0');
  creative.dom.video0.vid = document.getElementById('video-0');
}

/**
 * The Enabler is now initialized and any extra modules have been loaded.
 */
function init() {
  // You can update the autoplay flag to 'true' to enable muted
  // autoplay although it won't work on iOS.
  creative.autoplay0 = false;
  creative.isClick0 = false;
  creative.isCtaVisible = false;

  // Hide mute / unmute on iOS.
  if ((navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/iPod/i))) {
    creative.dom.video0.vidUnmuteBtn.style.opacity = 0;
    creative.dom.video0.vidMuteBtn.style.opacity = 0;
  }

  addVideoTracking0();
  addListeners();
  // Polite loading
  if (Enabler.isVisible()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
  }
}

/**
 * Add appropriate listeners after the creative's DOM has been set up.
 */
function addListeners() {
  creative.dom.exit.addEventListener('click', exitClickHandler);
  creative.dom.video0.vid.addEventListener('ended', videoEndHandler0, false);
  creative.dom.video0.vid.addEventListener('timeupdate', videoTimeUpdateHandler0, false);
}

/**
 *  Shows the ad.
 */
function show() {


  showIEbackup = function() {

    if (window.location.hash = !!window.MSInputMethodContext && !!document.documentMode){
      vid1.pause;
      //vid1.currentTime = 12;
      creative.dom.backup.style.visibility ="visible";
      console.log('IE11');
      creative.dom.clickbtn.addEventListener('click', exitClickHandler, false);
    }else{
      console.log('not IE');
    }
  }

  creative.dom.exit.style.display = "block";
  if (creative.autoplay0) {

    if (creative.dom.video0.vid.readyState >= 2) {
      startMuted0(null);
    }
    else {
      creative.dom.video0.hasCanPlay = true;
      creative.dom.video0.vid.addEventListener('canplay', startMuted0, false);
    }

  setTimeout(function(){}, 100);
  }
  else {
  } 
  creative.dom.video0.vidContainer.style.visibility  = 'visible';
  TweenLite.delayedCall(1, animStart);
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function exitClickHandler() {
  // Reset video
  creative.dom.video0.vid.pause();
  if (creative.dom.video0.vid.readyState > 0) {
    creative.dom.video0.vid.currentTime = 19;
  }
  creative.tl.seek(creative.tl.totalDuration());
  Enabler.exit('BackgroundExit');
  TweenMax.killAll();
}
/**
 * Triggered once the video player is ready to play the video.
 */
function startMuted0(e) {
  // Leaving the listener can cause issues on Chrome / Firefox
  if (creative.dom.video0.hasCanPlay) {
    creative.dom.video0.vid.removeEventListener('canplay', startMuted0);
    creative.dom.video0.hasCanPlay = false;
  }
  // If paused then play
  creative.dom.video0.vid.volume       = 0; // Muted by default
  creative.dom.video0.vid.currentTime  = 0;
//  creative.dom.video0.vid.play();
}


/**
 * Handler triggered when the video has finished playing.
 */
function videoEndHandler0(e) {
  creative.dom.video0.vid.currentTime = 19;
  creative.dom.video0.vid.pause();
  creative.isClick0 = true;
}

/**
 * Handler triggered when the video has timeUpdates.
 */
function videoTimeUpdateHandler0(e) {
 var perc = creative.dom.video0.vid.currentTime / creative.dom.video0.vid.duration;
 var currentTime = creative.dom.video0.vid.currentTime;
 if (currentTime > 13 && !creative.isCtaVisible) {
   creative.isCtaVisible = true;
   creative.tl.play('endFrame');
 }
}

/**
 * Add video metrics to the HTML5 video elements by loading in video module, and assigning to videos.
 */
function addVideoTracking0() {
  // Add in the video files.
  // These are 3 different codecs due to different browser specifications ; we recommend you have all 3 filetypes.
  var srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/webm');
  srcNode.setAttribute('src', Enabler.getUrl('video.webm'));
  creative.dom.video0.vid.appendChild(srcNode);

  srcNode = document.createElement('source');
  srcNode.setAttribute('type', 'video/mp4');
  srcNode.setAttribute('src', Enabler.getUrl('video.mp4'));
  creative.dom.video0.vid.appendChild(srcNode);

  creative.dom.video0.vid.appendChild(srcNode);

  Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
    studio.video.Reporter.attach('Video Report 0', creative.dom.video0.vid);
  }.bind(this));
}


function animStart() {

  

  creative.tl = new TimelineMax({
    paused:false,
    onStart: function() {
      creative.dom.video0.vid.play();
    }
  });

  creative.tl.to(creative.dom.preloadShape, .3, {alpha:0})
    .addPause()
    .to(creative.dom.cta, 0.5, {autoAlpha:1, ease: Linear.easeNone}, 'endFrame')

}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);