
var creative = {};

/**
 * Window onload handler.
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
 * Initializes the ad components
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
  creative.dom.endFrameImg = document.getElementById('endFrameImg');
  creative.dom.cta = document.getElementById('cta');
  creative.dom.container = document.getElementById('mainContainer');

  creative.dom.flowLine1 = document.getElementById('flowLineContainer1');
  creative.dom.flowLine2 = document.getElementById('flowLineContainer2'); 
  creative.dom.flowLine3 = document.getElementById('flowLineContainer3'); 
  creative.dom.flowLine4 = document.getElementById('flowLineContainer4'); 
  creative.dom.flowLine5 = document.getElementById('flowLineContainer5'); 
  creative.dom.flowLine6 = document.getElementById('flowLineContainer6'); 



  var ctaHovered = false;
  var ctaHover = function(){
      if(ctaHovered){
          TweenMax.to(creative.dom.cta, 0.3,{borderColor: '#ffffff' ,ease:Power1.easeOut})
      } else {
          TweenMax.to(creative.dom.cta, 0.6,{borderColor: '#4c6be3' ,ease:Power1.easeOut})
      }
      ctaHovered = !ctaHovered;
  };
  creative.dom.container.addEventListener('mouseover', ctaHover, false);
  creative.dom.container.addEventListener('mouseout', ctaHover, false);

}

/**
 * Ad initialisation.
 */
function init() {

  addListeners();

  // Polite loading
  if (Enabler.isPageLoaded()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, show);
  }
}

/**
 * Adds appropriate listeners at initialization time
 */
function addListeners() {
  creative.dom.mainContainer.addEventListener('click', exitClickHandler);

}

/**
 *  Shows the ad.
 */
function show() {

  TweenLite.to(creative.dom.preloadShape, .3, {alpha:0});
  animStart();
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function exitClickHandler() {
  Enabler.exit('BackgroundExit');
}

function animStart() {

  tl = new TimelineMax({paused:false});

    tl.addLabel('start')

         .set(creative.dom.flowLine1, {scaleX:1.3, scaleY:0.9, rotation:270}, 'start+=0.7')
         .to(creative.dom.flowLine1, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'start+=0.7')

    .addLabel('chrIntro', 1.2)        

        .fromTo(creative.dom.chrContainer, 4, {scale:0.9}, {scale:1, ease: Power2.easeOut}, 'chrIntro')
        .to(creative.dom.chrLogo, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro')
        .to(creative.dom.chrLogoImg, 1.2, {x:-4000, ease:SteppedEase.config(25)}, 'chrIntro+=0.2')

        .to(creative.dom.chrHeadline, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=1.3')
        .to(creative.dom.chrCar, 0.5, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=2.5')

        .set(creative.dom.flowLine2, {scaleX:0.4, scaleY:0.2}, 'chrIntro+=1')
        .to(creative.dom.flowLine2, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'chrIntro+=1')

    .addLabel('headLine1', 5.5)  

        .to(creative.dom.chrContainer, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'headLine1-=0.2')

        .set(creative.dom.flowLine3, {scaleX:1, scaleY:1.3, rotation:45}, 'headLine1-=0.2')
        .to(creative.dom.flowLine3, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'headLine1-=0.2')


        .to(creative.dom.copy1, 0.3, {autoAlpha:1, ease: Linear.easeNone}, 'headLine1+=0.4')

        .set(creative.dom.flowLine4, {scaleX:0.5, scaleY:0.7, rotation:180}, 'headLine1+=1')
        .to(creative.dom.flowLine4, 1, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'headLine1+=1')


        .to(creative.dom.copy2, 0.4, {autoAlpha:1, ease: Linear.easeNone}, 'headLine1+=1.6')

        .set(creative.dom.flowLine5, {scaleX:0.5, scaleY:0.3}, 'headLine1+=1')
        .to(creative.dom.flowLine5, 1, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'headLine1+=2.75')


        .to(creative.dom.copy2, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'headLine1+=3')
        .to(creative.dom.copy3, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'headLine1+=2.95')

     .addLabel('endframe', 11) 

        .set(creative.dom.flowLine6, {scaleX:1, scaleY:1.3, rotation:225}, 'endframe-=0.7')
        .to(creative.dom.flowLine6, 1, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'endframe-=0.7')

        .to(creative.dom.copy1, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'endframe-=0.5')
        .to(creative.dom.copy3, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'endframe-=0.5') 

        .to(creative.dom.endFrameImg, 0.4, {autoAlpha:1, ease: Linear.easeNone}, 'endframe')

        .to(creative.dom.cta, 0.4, {autoAlpha:1, ease: Linear.easeNone}, 'endframe+=0.5')
}



/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);