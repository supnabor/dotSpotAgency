// Anchor Scrolling
function initAnchorScrolling() {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
}

// Accordion
function initAccordion() {
  $('.item-title').click(function () {
    $(this).parent().toggleClass('is-active');
  });
}

// Progress Bar
function initScrollProgressBar() {
  function checkProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const position = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (position / height) * 100;
    progressBar.style.width = progress + '%';
  }

  checkProgress();

  document.addEventListener('scroll', checkProgress);
}

// Burger Menu
function initHamburger() {
  const activeClass = 'active';
  const $button = $('.burger-button');
  const $navContainer = $('.header-nav');
  const $navItems = $('.header-link');

  function toggleActiveClass() {
    [$button, $navContainer].forEach((item) => item.toggleClass(activeClass));
  }

  $button.click(toggleActiveClass);
  $navItems.click(toggleActiveClass);
}

// Check if element entered viewport
function isInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.top < window.innerHeight && rect.bottom >= 0;
}

// Footer parallax animation
function initParallax() {
  let offset = 0;
  let scrollPos = 0;
  const footer = document.querySelector('.footer');
  const topScene = footer.querySelector('.parallax-scene-top');
  const bottomScene = footer.querySelector('.parallax-scene-bottom');

  window.addEventListener('scroll', function () {
    // Check if footer entered viewport and define scroll direction
    if (isInViewport(footer)) {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        offset--;
        offset = offset - 3;
      } else {
        offset++;
        offset = offset + 3;
      }
      scrollPos = document.body.getBoundingClientRect().top;

      topScene.style.transform = `translateY(${offset * -1}px)`;
      bottomScene.style.transform = `translateY(${offset}px)`;
    } else {
      offset = 0;
      topScene.style.transform = `translateY(0px)`;
      bottomScene.style.transform = `translateY(0px)`;
    }
  });
}

// Universal Parallax Handler
function initParralaxAt(selector, multiplier = 1) {
  let offset = 0;
  let prevScrollPosition = 0;
  const element = document.querySelector(selector);
  const parallaxUp = element.querySelectorAll('.parallax-up');
  const parallaxDown = element.querySelectorAll('.parallax-down');

  function setTranslateY(value) {
    return (element) => {
      element.style.transform = `translateY(${value}px)`;
    };
  }

  window.addEventListener('scroll', function () {
    if (isInViewport(element)) {
      const bodyBoundingClientRect = document.body.getBoundingClientRect();
      const isScrollingUp = bodyBoundingClientRect.top > prevScrollPosition;

      offset = isScrollingUp ? offset - multiplier : offset + multiplier;
      prevScrollPosition = bodyBoundingClientRect.top;

      parallaxUp && parallaxUp.forEach(setTranslateY(offset * -1));
      parallaxDown && parallaxDown.forEach(setTranslateY(offset));
    } else {
      offset = 0;
      prevScrollPosition = 0;

      parallaxUp && parallaxUp.forEach(setTranslateY(offset));
      parallaxDown && parallaxDown.forEach(setTranslateY(offset));
    }
  });
}

//Smooth Animation on Scroll
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add('_active');
      } else {
        animItem.classList.remove('_active');
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + screenLeft };
  }
  animOnScroll();
}

var canvas,
  stage,
  exportRoot,
  anim_container,
  dom_overlay_container,
  fnStartAnimation;

function initHeroDots() {
  canvas = document.getElementById('canvas-bg');
  anim_container = document.getElementById('animation_container');
  dom_overlay_container = document.getElementById('dom_overlay_container');
  var comp = AdobeAn.getComposition('9441FA25C65B1B4387049F2F48B9C763');

  var lib = comp.getLibrary();
  handleComplete({}, comp);
}
function handleComplete(evt, comp) {
  //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
  var lib = comp.getLibrary();
  var ss = comp.getSpriteSheet();
  exportRoot = new lib.bgdesktop();
  stage = new lib.Stage(canvas);
  //Registers the "tick" event listener.
  fnStartAnimation = function () {
    stage.addChild(exportRoot);
    createjs.Ticker.framerate = lib.properties.fps;
    createjs.Ticker.addEventListener('tick', stage);
  };
  //Code to support hidpi screens and responsive scaling.
  AdobeAn.makeResponsive(false, 'both', false, 1, [
    canvas,
    anim_container,
    dom_overlay_container,
  ]);
  AdobeAn.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}

$(document).ready(function () {
  initAccordion();
  initHamburger();
  initAnchorScrolling();
  // initScrollProgressBar();
  // initScrollTopButton();
  // initParallax();
  // initParralaxAt('.footer', 4);
  // initParralaxAt('.info', 1.5);
  // initParralaxAt('.about', 4);
  // initParralaxAt('.education', 3.5);
  initHeroDots();
});
