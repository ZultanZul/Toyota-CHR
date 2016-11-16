
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
  creative.dom.preloadShapeCollapsed = document.getElementById('preloadShapeCollapsed');
  creative.dom.preloadShapeExpanded = document.getElementById('preloadShapeExpanded');
  creative.dom.expandedExit = document.getElementById('expanded-exit');
  creative.dom.expandedContent = document.getElementById('expanded-state');
  creative.dom.collapsedExit = document.getElementById('collapsed-exit');
  creative.dom.collapsedContent = document.getElementById('collapsed-state');
  creative.dom.collapseButton = document.getElementById('collapse-button');
  creative.dom.expandButton = document.getElementById('expand-button');
  creative.dom.image0 = document.getElementById('main-img-0');
  creative.dom.image1 = document.getElementById('main-img-1');
}

/**
 * The Enabler is now initialized and any extra modules have been loaded.
 */
function init() {
  Enabler.setStartExpanded(false);
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
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
  Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);
  creative.dom.expandButton.addEventListener('click', onExpandHandler, false);
  creative.dom.collapseButton.addEventListener('click', onCollapseClickHandler, false);
  creative.dom.expandedExit.addEventListener('click', exitClickHandler);
  creative.dom.collapsedExit.addEventListener('click', collapsedExitClickHandler);
}

/**
 *  Shows the ad.
 */
function show() {
  creative.dom.expandedContent.style.display = 'none';
  creative.dom.expandedExit.style.display = 'none';
  creative.dom.collapseButton.style.display = 'none';

  creative.dom.collapsedContent.style.display = 'block';
  creative.dom.collapsedExit.style.display = 'block';
  creative.dom.expandButton.style.display = 'block';
  creative.dom.image0.style.visibility  = 'visible';
  creative.dom.image1.style.visibility  = 'visible';

  TweenLite.to(creative.dom.preloadShapeCollapsed, .3, {alpha:0});
  animStartCollapsed();
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------


function expandStartHandler() {
  // Show expanded content.
  creative.dom.expandedContent.style.display = 'block';
  creative.dom.expandedExit.style.display = 'block';
  creative.dom.collapseButton.style.display = 'block';
  creative.dom.collapsedContent.style.display = 'none';
  creative.dom.collapsedExit.style.display = 'none';
  creative.dom.expandButton.style.display = 'none';

  Enabler.finishExpand();
  TweenLite.to(creative.dom.preloadShapeExpanded, .3, {alpha:0});
  animStartExpanded();
}

function expandFinishHandler() {
  creative.isExpanded = true;
}

function collapseStartHandler() {
  // Perform collapse animation.
  creative.dom.expandedContent.style.display = 'none';
  creative.dom.expandedExit.style.display = 'none';
  creative.dom.collapseButton.style.display = 'none';
  creative.dom.collapsedContent.style.display = 'block';
  creative.dom.collapsedExit.style.display = 'block';
  creative.dom.expandButton.style.display = 'block';

  // When animation finished must call
  Enabler.finishCollapse();
}

function collapseFinishHandler() {
  creative.isExpanded = false;
}

function onCollapseClickHandler(){
  Enabler.requestCollapse();
  Enabler.stopTimer('Panel Expansion');
}

function onExpandHandler(){
  Enabler.requestExpand();
  Enabler.startTimer('Panel Expansion');
}

function exitClickHandler() {
  Enabler.requestCollapse();
  Enabler.stopTimer('Panel Expansion');
  Enabler.exit('BackgroundExit');
}

function collapsedExitClickHandler() {
  Enabler.exit('CollapsedExit');
}

function animStartCollapsed() {

  tlCollapsed = new TimelineMax({paused:false});

    tlCollapsed.addLabel('start')

    //      .set(creative.dom.flowLine1, {scaleX:1.2, scaleY:1.4, rotation:240}, 'start+=0.7')
    //      .to(creative.dom.flowLine1, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'start+=0.7')

    // .addLabel('chrIntro', 1.2)        

    //     .fromTo(creative.dom.chrContainer, 3, {scale:0.9}, {scale:1, ease: Power2.easeOut}, 'chrIntro')
    //     .to(creative.dom.chrLogo, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro')
    //     .to(creative.dom.chrHeadline, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=0.7')
    //     .to(creative.dom.chrCar, 0.5, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=1.2')

    //     .set(creative.dom.flowLine2, {scaleX:1, scaleY:0.25}, 'chrIntro+=0.2')
    //     .to(creative.dom.flowLine2, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'chrIntro+=0.2')
}

function animStartExpanded() {

  tlExpanded = new TimelineMax({paused:false});

    tlExpanded.addLabel('start')

    //      .set(creative.dom.flowLine1, {scaleX:1.2, scaleY:1.4, rotation:240}, 'start+=0.7')
    //      .to(creative.dom.flowLine1, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'start+=0.7')

    // .addLabel('chrIntro', 1.2)        

    //     .fromTo(creative.dom.chrContainer, 3, {scale:0.9}, {scale:1, ease: Power2.easeOut}, 'chrIntro')
    //     .to(creative.dom.chrLogo, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro')
    //     .to(creative.dom.chrHeadline, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=0.7')
    //     .to(creative.dom.chrCar, 0.5, {autoAlpha:1, ease: Linear.easeNone}, 'chrIntro+=1.2')

    //     .set(creative.dom.flowLine2, {scaleX:1, scaleY:0.25}, 'chrIntro+=0.2')
    //     .to(creative.dom.flowLine2, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'chrIntro+=0.2')

    // .addLabel('headLine1', 4.5)  

    //     .to(creative.dom.chrContainer, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'headLine1-=0.2')

    //     .set(creative.dom.flowLine3, {scaleX:0.7, scaleY:1.3, rotation: -90}, 'headLine1-=0.2')
    //     .to(creative.dom.flowLine3, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'headLine1-=0.2')


    //     .to(creative.dom.copy1, 0.3, {autoAlpha:1, ease: Linear.easeNone}, 'headLine1+=0.4')

    //     .set(creative.dom.flowLine4, {scaleX:1, scaleY:1.4, rotation:130}, 'headLine1+=1')
    //     .to(creative.dom.flowLine4, 0.9, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'headLine1+=1')


    //     .to(creative.dom.copy2, 0.4, {autoAlpha:1, ease: Linear.easeNone}, 'headLine1+=1.6')

    //     .set(creative.dom.flowLine5, {scaleX:1, scaleY:1.4, rotation:220}, 'headLine1+=2.8')
    //     .to(creative.dom.flowLine5, 0.9, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'headLine1+=2.8')


    //     .to(creative.dom.copy2, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'headLine1+=3')
    //     .to(creative.dom.copy3, 0.2, {autoAlpha:1, ease: Linear.easeNone}, 'headLine1+=3.5')

    //  .addLabel('endframe', 10) 

    //     .set(creative.dom.flowLine6, {scaleX:1, scaleY:0.8}, 'endframe-=0.7')
    //     .to(creative.dom.flowLine6, 0.8, {backgroundPosition: "0 -3000px", ease:SteppedEase.config(15)}, 'endframe-=0.7')

    //     .to(creative.dom.copy1, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'endframe-=0.5')
    //     .to(creative.dom.copy3, 0.2, {autoAlpha:0, ease: Linear.easeNone}, 'endframe-=0.5') 

    //     .to(creative.dom.endFrameImg, 0.4, {autoAlpha:1, ease: Linear.easeNone}, 'endframe')

    //     .to(creative.dom.cta, 0.4, {autoAlpha:1, ease: Linear.easeNone}, 'endframe+=0.5')
}





/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);