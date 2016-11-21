//////////////////////////////////////////////////////////
// Copyright 2015 Google Inc. All Rights Reserved.
//////////////////////////////////////////////////////////

/**
 * @fileoverview Main JS file for the "IAB Mobile Rising Stars Adhesion"
 * DoubleClick Rich Media ad format.
 * Edit file "custom.js" if you need custom JS code.
 */

var dcrm = {};
var creative = {};


/**
 * Window onload handler.
 */
function preInit() {

  creative.mainContainer = document.querySelector('.mainContainer') ;
  // colContent
  creative.footer = document.querySelector('.footer') ;

  creative.preloadShape = document.getElementById('preloadShape') ;

  creative.chrLogoFooter = document.querySelector('.footer .CHR-logo') ;
  creative.chrHeadlineFooter = document.querySelector('.footer .CHR-headline') ; 
  creative.ctaFooter = document.querySelector('.footer .cta') ;
  creative.collapseCloseBtnFooter = document.getElementById('collapse-close-button');  

  creative.flowLine1Footer = document.querySelector('.footer .flowLineContainer1') ;
  creative.flowLine2Footer = document.querySelector('.footer .flowLineContainer2') ; 
  creative.flowLine3Footer = document.querySelector('.footer .flowLineContainer3') ; 

  creative.videoContainer = document.querySelector('.mainContainer .video-position') ;
  creative.video = document.querySelector('.mainContainer #video') ;
  creative.muter = document.querySelector('.mainContainer .mute') ;
  creative.mute = document.querySelector('.mainContainer .mute img') ;

  creative.chrLogo = document.querySelector('.mainContainer .CHR-logo') ;
  creative.chrCar =document.querySelector('.mainContainer .CHR-car') ;  
  creative.chrHeadline = document.querySelector('.mainContainer .CHR-headline') ;
  creative.cta = document.querySelector('.mainContainer .cta') ;  

  creative.flowLine1 = document.querySelector('.mainContainer .flowLineContainer1') ;
  creative.flowLine2 = document.querySelector('.mainContainer .flowLineContainer2') ; 
   
  creative.collapseCloseBtn = document.getElementById('close-button');

  initAnimations() ;

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
 * Ad initialisation.
 */

function init() {

  var evalStmt = '(function() {' +
      'var s = document.createElement(\'script\');' +
      'var rand = Math.floor((Math.random()*100)+1); ' +
      's.src = \'' + dcrm.HANDLER_SRC_ + '?\' + rand;' +
      's.onload = function() {' +
        'var handler = ' +
        'studioinnovation.layouts.adhesion.AdhesionHandler.getInstance();' +
        'handler.setUpCreativeWhenReady(\'' + Enabler.getParameter('creativeId') +
        '\', 320, 50);' +
      '};' +
      'document.head.appendChild(s);' +
    '}())';

  Enabler.invokeExternalJsFunction(evalStmt);

  addListeners();

  // Polite loading
  if (Enabler.isPageLoaded()) {
    show() ;
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, show) ;
  }

}

/**
 *  Shows the ad.
 */

function show() {
  TweenLite.to(creative.preloadShape, .3, {alpha:0});
  creative.footerAnimation.play();
  //footerStart();
}


/**
 * Adds appropriate listeners at initialization time
 */
function addListeners() {

  /**
   * Adds relevant Adhesion event listeners.
   */

  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_DIMENSIONS,
      dcrm.initExpansion_, false);

  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,
      dcrm.collapseStartHandler_, false);
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH,
      dcrm.collapseFinishHandler_, false);

  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START,
      dcrm.expandStartHandler_, false);
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH,
      dcrm.expandFinishHandler_, false);



  creative.footer.addEventListener('click', function(e){

      if(e.target == creative.collapseCloseBtnFooter ) {
          dcrm.closeHandler() ;         
      } else {
          dcrm.expand() ;  
      }

  });

  creative.mainContainer.addEventListener('click', function(e){    
      if(e.target == creative.collapseCloseBtn ) {
          creative.video.pause();
          dcrm.collapse() ;         
      } else if ( e.target == creative.mute){
          muting () ; 
      } else {
          creative.video.pause();
          exitClickHandler() ;  
      }

  });

}

// ------------------------------------------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------------------------------------------


dcrm.closeHandler = function(e) {
  Enabler.reportManualClose() ;
  Enabler.close() ;
};


function exitClickHandler() {
  Enabler.exit('BackgroundExit') ;
  dcrm.closeHandler() ;
};

function muting (){
  muting.off = (muting.off)? false : true ;
  creative.muter.className = (muting.off)? 'mute on':' mute' ;
  creative.video.muted = !muting.off;
}


function initAnimations() {

  ///////////////////
  //  footer
  ///////////////////  

  creative.footerAnimation = new TimelineMax({paused:true});

    creative.footerAnimation.addLabel('logoReveal')

        .set(creative.flowLine1Footer, {scaleX:1.2, scaleY:1.4, rotation:240}, 'logoReveal+=0.7')
        .to(creative.flowLine1Footer, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'logoReveal+=0.7') 

        // .fromTo(creative.chrContainer, 3, {scale:0.9}, {scale:1, ease: Power2.easeOut}, 'chrIntro')
        .to(creative.chrLogoFooter, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'logoReveal+=1.1')

    .addLabel('taglineReveal', 2)       

        .set(creative.flowLine2Footer, {scaleX:1.2, scaleY:.8, rotation:0}, 'taglineReveal+=0.7')
        .to(creative.flowLine2Footer, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'taglineReveal+=0.7')

        .to(creative.chrHeadlineFooter, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'taglineReveal+=1.1')

    .addLabel('ctaReveal', 4)

        .set(creative.flowLine3Footer, {scaleX:1.2, scaleY:.8, rotation:180}, 'ctaReveal+=0.7')
        .to(creative.flowLine3Footer, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'ctaReveal+=0.7')
        .set(creative.chrHeadlineFooter, {autoAlpha:0}, 'ctaReveal+=0.9')

        .to(creative.ctaFooter, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'ctaReveal+=1.1')

  ///////////////////
  //  MAIN
  ///////////////////  

  creative.mainAnimation = new TimelineMax({paused:true});

    creative.mainAnimation.addLabel('logoReveal')

         .set(creative.flowLine1, {scaleX:2.5, scaleY:1.7, rotation:240}, 'logoReveal+=0.5')
         .to(creative.flowLine1, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'logoReveal+=0.5') 

        // .fromTo(creative.chrContainer, 3, {scale:0.9}, {scale:1, ease: Power2.easeOut}, 'chrIntro')
        .to(creative.chrLogo, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'logoReveal+=0.9')

    .addLabel('taglineReveal', 0.6)       

      .set(creative.flowLine2, {scaleX:2, scaleY:.8, rotation:0}, 'taglineReveal+=0.7')
      .to(creative.flowLine2, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'taglineReveal+=0.7') 
      .to(creative.chrHeadline, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'taglineReveal+=1.1')
      
    .addLabel('ctaReveal', 1)

      .to(creative.videoContainer, 0.2, {autoAlpha:1, ease: Linear.easeNone,
        onStart:function(){
          creative.video.currentTime = 0 ;
        },
        onComplete:function(){
          creative.video.play() ;
        }}, 'ctaReveal+=1.1')

      .to(creative.chrCar, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'ctaReveal+=1.1')  
      .to(creative.cta, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'ctaReveal+=1.1')          

}


// ------------------------------------------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------------------------------------------


/**
 * Script to notify the external handler of the collapse event.
 * @private {string}
 */
dcrm.HANDLER_COLLAPSE_ = '(function() {' +
  'studioinnovation.layouts.adhesion.AdhesionHandler.getInstance().' +
  'collapseHandler();' +
'}())';


/**
 * Script to destroy the external handler instance.
 * @private {string}
 */
dcrm.HANDLER_DISPOSAL_ = '(function() {' +
  'studioinnovation.layouts.adhesion.AdhesionHandler.getInstance().dispose();' +
'}())';


/**
 * Script to notify the external handler of the expand event.
 * @private {string}
 */
dcrm.HANDLER_EXPAND_ = '(function() {' +
  'studioinnovation.layouts.adhesion.AdhesionHandler.getInstance().' +
  'expandHandler();' +
'}())';


/**
 * Source path of the handler javascript file.
 * @private {string}
 */
dcrm.HANDLER_SRC_ = '//www.gstatic.com/doubleclick/studio/' +
  'innovation/h5/layouts/adhesion/1/adhesion_handler_min.js';


/**
 * Starts the expansion process.
 * @private
 */
dcrm.initExpansion_ = function() {
  Enabler.requestFullscreenExpand();
};


/**
 * Handles the begin of the expansion process and completes it.
 * @private
 */
dcrm.expandStartHandler_ = function() {
  Enabler.finishFullscreenExpand();

  creative.mainAnimation.seek(0);
};


/**
 * Shows the expanded panel and hides the collapsed panel to reflect expanded
 * state.
 * @private
 */
dcrm.expandFinishHandler_ = function() {

  creative.mainContainer.style.display = 'block';
  creative.footer.style.display = 'none';
  // dcrm.customExpandHandler();
  Enabler.invokeExternalJsFunction(dcrm.HANDLER_EXPAND_);

  creative.mainAnimation.play();
  //mainStart() ;

};


/**
 * Handles the begin of the collapse process and completes it.
 * @private
 */
dcrm.collapseStartHandler_ = function() {
  Enabler.finishFullscreenCollapse();
};


/**
 * Shows the collapsed panel and hides the expanded panel to reflect collapsed
 * state.
 * @private
 */
dcrm.collapseFinishHandler_ = function() {
  creative.mainContainer.style.display = 'none';
  creative.footer.style.display = 'block';

  Enabler.counter('Fullscreen Panel Closed');
  Enabler.invokeExternalJsFunction(dcrm.HANDLER_COLLAPSE_);
};


// ------------------------------------------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------------------------------------------


/**
 * Handles the expansion from footer to fullscreen.
 */
dcrm.expand = function() {
  Enabler.queryFullscreenDimensions();
};

/**
 * Handles the collapse from fullscreen to footer.
 */
dcrm.collapse = function() {
  Enabler.requestFullscreenCollapse();
};


/**
 *  Main onload handler
 */
Enabler.setFloatingPixelDimensions(320,50);
window.addEventListener('load', preInit);