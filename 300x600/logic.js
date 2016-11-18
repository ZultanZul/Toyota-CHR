
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
  creative.dom.mainContainer = document.getElementById('mainContainer');
  creative.dom.preloadShape = document.getElementById('preloadShape');
  creative.dom.chrContainer = document.getElementById('CHR-logo-container');
  creative.dom.chrCar = document.getElementById('CHR-car');
  creative.dom.chrLogo = document.getElementById('CHR-logo');
  creative.dom.chrLogoImg = document.getElementById('CHR-logo-IMG');
  creative.dom.chrHeadline = document.getElementById('CHR-headline');
  creative.dom.copy1 = document.getElementById('copy-1');
  creative.dom.copy2 = document.getElementById('copy-2');
  creative.dom.copy3 = document.getElementById('copy-3');
  creative.dom.copy4 = document.getElementById('copy-4');
  creative.dom.endFrameImg = document.getElementById('endFrameImg');
  creative.dom.cta = document.getElementById('cta');
  creative.dom.container = document.getElementById('mainContainer');

  creative.dom.flowLine1 = document.getElementById('flowLineContainer1');
  creative.dom.flowLine2 = document.getElementById('flowLineContainer2'); 

  var ctaHovered = false;
  var ctaHover = function(){
      if(ctaHovered){
          TweenMax.to(creative.dom.cta, 0.3,{borderColor: '#ffffff' ,ease:Power1.easeOut})
      } else {
          TweenMax.to(creative.dom.cta, 0.6,{borderColor: '#4c6be3' ,ease:Power1.easeOut})
      }
      ctaHovered = !ctaHovered;
  };
  creative.dom.mainContainer.addEventListener('mouseover', ctaHover, false);
  creative.dom.mainContainer.addEventListener('mouseout', ctaHover, false);

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
  creative.hasVideoEnded = false;

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
  creative.dom.mainContainer.addEventListener('click', exitClickHandler);
  creative.dom.video0.vid.addEventListener('ended', videoEndHandler0, false);
  creative.dom.video0.vid.addEventListener('timeupdate', videoTimeUpdateHandler0, false);
}

/**
 *  Shows the ad.
 */
function show() {


  showIEbackup = function() {

    if (window.location.hash = !!window.MSInputMethodContext && !!document.documentMode){
      creative.dom.backup.style.visibility ="visible";
      console.log('IE11');
      creative.dom.clickbtn.addEventListener('click', exitClickHandler, false);
    }else{
      console.log('not IE');
    }
  }

  creative.dom.mainContainer.style.display = "block";
  if (creative.autoplay0) {

    if (creative.dom.video0.vid.readyState >= 2) {
      startMuted0(null);
    }
    else {
      creative.dom.video0.hasCanPlay = true;
      creative.dom.video0.vid.addEventListener('canplay', startMuted0, false);
    }
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
    creative.dom.video0.vid.currentTime = 11.5;
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
  creative.dom.video0.vid.currentTime = 11;
  creative.dom.video0.vid.pause();
  creative.isClick0 = true;
}

/**
 * Handler triggered when the video has timeUpdates.
 */
function videoTimeUpdateHandler0(e) {
 var perc = creative.dom.video0.vid.currentTime / creative.dom.video0.vid.duration;
 var currentTime = creative.dom.video0.vid.currentTime;
    if (currentTime > 11 && !creative.hasVideoEnded) {
     creative.hasVideoEnded = true;
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

  

  creative.tl = new TimelineMax({paused:false});

    creative.tl.to(creative.dom.preloadShape, .3, {alpha:0})

    .addLabel('start')

         .set(creative.dom.flowLine1, {scaleX:1.3, scaleY:1.3, rotation:-75}, 'start+=0.7')
         .to(creative.dom.flowLine1, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'start+=0.7')

    .addLabel('chrIntro', 1.2)        

        .fromTo(creative.dom.chrLogo, 4, {scale:0.95}, {scale:1, ease: Power2.easeOut}, 'chrIntro')        
        .to(creative.dom.chrLogo, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro')        
        .to(creative.dom.chrLogoImg, 3, {y:-6240, ease:SteppedEase.config(48)}, 'chrIntro+=0.2')

        .to(creative.dom.chrCar, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro')        
        .fromTo(creative.dom.chrCar, 4, {scale:0.95}, {scale:1, ease: Power2.easeOut}, 'chrIntro')        

        .to(creative.dom.cta, 0.5, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=0.2')

        .set(creative.dom.flowLine2, {scaleX:1, scaleY:0.4}, 'chrIntro+=1.4')
        .to(creative.dom.flowLine2, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'chrIntro+=1.4')

    .addLabel('video', 5.5)  

        .set(creative.dom.video0.vidContainer, { autoAlpha: 1, ease: Power2.easeInOut, onComplete: function() {
                creative.dom.video0.vid.play();
            }}, 'video')

        .to(creative.dom.copy1, 0.3, {autoAlpha:1, ease: Linear.easeNone}, 'video')
        .set(creative.dom.copy1, {autoAlpha:0}, 'video+=3')

        .to(creative.dom.copy2, 0.3, {autoAlpha:1, ease: Linear.easeNone}, 'video+=3.2')
        .set(creative.dom.copy2, {autoAlpha:0}, 'video+=5')

        .to(creative.dom.copy3, 0.3, {autoAlpha:1, ease: Linear.easeNone}, 'video+=5.2')

        .addPause()

    .addLabel('endFrame')  

        .to(creative.dom.copy4, 0.3, {autoAlpha:1, ease: Linear.easeNone}, 'endFrame+=0.5')

        .to(creative.dom.video0.vidContainer, 0.5, { autoAlpha: 0, ease: Power2.easeInOut, onComplete: function() {
                creative.dom.video0.vid.pause();
            }}, 'endFrame')      
}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);