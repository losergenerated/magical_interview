/************************************************************************
 * 'touch.js'
 *
 * This file is GENERATED by the AssetAggregator; do not edit it.
 * Last modified: 2016-07-14 01:06:05 +0000
 * Generated at: 2016-07-14 16:15:14 +0000
 ************************************************************************/


/************************************************************************
 * :asset_packager_compatibility, 'config/asset_packages.yml' (last modified: 2016-07-14 01:06:05 +0000)
 ************************************************************************/

/* ----------------------------------------------------------------------
   - public/javascripts/shared/vendor/lazy_image.js (last modified: 2015-11-10 00:53:02 +0000)
   ---------------------------------------------------------------------- */
/*
  lazyload.js: Image lazy loading

  Copyright (c) 2012 Vincent Voyer, Stéphane Rios

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function(window, document){

  var
    // Vertical offset in px. Used for preloading images while scrolling
    offset = 200,
    //where to get real src
    lazyAttr = 'data-src',
    // Window height
    winH,
    // Self-populated page images array, we do not getElementsByTagName
    imgs = [],
    pageHasLoaded,

    // throttled functions, so that we do not call them too much
    getWindowHeightT = throttle(getWindowHeight, 20),
    showImagesT = throttle(showImages, 20);

  // Called from every lazy <img> onload event
  window['lzld'] = onFakeImgLoad;
  window['force_lzld'] = loadImg;

  // Bind events
  getWindowHeight();
  addEvent(window, 'resize', getWindowHeightT);
  addEvent(window, 'scroll', showImagesT);
  addEvent(document, 'DOMContentLoaded', onDomReady);
  addEvent(window, 'load', onLoad);

  function onFakeImgLoad(img) {
    // To avoid onload being called and called and called ...
    // This is what prevents pagespeed's lazyload to work on IE!
    img.onload = null;

    showIfVisible(img, imgs.push(img) - 1);
  }

  function onDomReady() {
    showImagesT();
    setTimeout(showImagesT, 20);
  }

  function onLoad() {
    pageHasLoaded = true;
    // if page height changes (hiding elements at start)
    // we should recheck for new in viewport images that need to be shown
    // see onload test
    showImagesT();
    // we are the first to be notified about onload, so let others event handlers
    // pass and then try again
    setTimeout(showImagesT, 20);
  }

  function throttle(fn, minDelay) {
    var lastCall = 0;
    return function() {
      var now = +new Date;
      if (now - lastCall < minDelay) {
        return;
      }
      lastCall = now;
      // we do not return anything as
      // https://github.com/documentcloud/underscore/issues/387
      fn.apply(this, arguments);
    }
  }

  // cross browser event add
  function addEvent( el, type, fn ) {
    if (el.attachEvent) {
      el.attachEvent && el.attachEvent( 'on' + type, fn );
    } else {
      el.addEventListener( type, fn, false );
    }
  }

  // cross browser event remove
  function removeEvent( el, type, fn ) {
    if (el.detachEvent) {
      el.detachEvent && el.detachEvent( 'on' + type, fn );
    } else {
      el.removeEventListener( type, fn, false );
    }
  }
  
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  function loadImg(img, index){
    if(!img.getAttribute(lazyAttr)) return; // not used properly or already loaded.
    img.src = img.getAttribute(lazyAttr);
    img.removeAttribute(lazyAttr);
    if(!index && index !== 0) index = __indexOf.call(imgs, img);
    if(index >= 0) imgs[index] = null;
  }

  // img = dom element
  // index = imgs array index
  function showIfVisible(img, index) {
    var invis = img.getBoundingClientRect().top == 0 && img.getBoundingClientRect().bottom == 0 
    if (!invis && img.getBoundingClientRect().top < winH + offset) {
      loadImg(img, index);
      return true; // img shown
    } else {
      return false; // img to be shown
    }
  }

  // cross browser window height
  function getWindowHeight() {
    winH = window.innerHeight ||
      (document.documentElement && document.documentElement.clientHeight) ||
      (document.body && document.body.clientHeight) ||
      10000;
  }

  // Loop through images array to find to-be-shown images
  function showImages() {
    var
      last = imgs.length,
      current,
      allImagesDone = true;

    for (current = 0; current < last; current++) {
      var img = imgs[current];
      // if showIfVisible is false, it means we have some waiting images to be
      // shown
      if(img !== null && !showIfVisible(img, current)) {
        allImagesDone = false;
      }
    }

    if (allImagesDone && pageHasLoaded) {
    }
  }

  function unsubscribe() {
    // removeEvent(window, 'resize', getWindowHeightT);
    // removeEvent(window, 'scroll', showImagesT);
    // removeEvent(window, 'load', onLoad);
    // removeEvent(document, 'DOMContentLoaded', onDomReady);
  }

})(this, document);


/* ----------------------------------------------------------------------
   - public/javascripts/mobile/touch_gestures.js (last modified: 2015-11-10 00:53:02 +0000)
   ---------------------------------------------------------------------- */
var TouchGestures = {};

TouchGestures.enabled = !!("ontouchstart" in window || window.navigator.msPointerEnabled);

var msTouchEvents = {
    touchstart: 'MSPointerDown',
    touchmove: 'MSPointerMove',
    touchend: 'MSPointerUp'
};

/* Translate between MS and WebKit touch APIs. */
var t = TouchGestures.touchEvent = function(eventName) {
    if (window.navigator.msPointerEnabled) {
        return msTouchEvents[eventName];
    }
    return eventName;
}

/* Translate from MSPointerDown to touchstart, etc. */
TouchGestures.normalizeEvent = function(eventName) {
    return _.invert(msTouchEvents)[eventName] || eventName;
}

// ********** TouchGestures.clickWithNoDelay (eliminate mobile safari click delay) **********
TouchGestures.clickWithNoDelay = function(element, callback, preventMove) {
    if (!element) { return; }
    element = $(element);
    if (TouchGestures.enabled) {
        if ( window.jQuery === window['$'] ) element = element[0];
        element.addEventListener(t('touchstart'), function(e) {
            var moved = false;
            var touchmove = function(e) { preventMove ? e.preventDefault() : moved = true;};
            var touchend  = function(e) {
                element.removeEventListener(t('touchmove'), touchmove, false);
                element.removeEventListener(t('touchend'), touchend, false);
                !moved && callback(e);
            };

            element.addEventListener(t('touchmove'), touchmove, false);
            element.addEventListener(t('touchend'), touchend, false);
        });
    } else {
        (window.jQuery === $) ? element.on('click', callback) : element.observe('click', callback);
    }
};

/********** TouchGestures.Press  **********/
TouchGestures.Press = function(element, options) {
    options = options || {delay: 1000, touches: 1};
    this.element = $(element);
    this.delay   = options.delay || 1000;
    this.touches = options.touches || 1;
    this.timer   = null;
    this.pressed = false;
    var that = this;
    if ( window.jQuery === $ ) {
        this.element[0].addEventListener(t('touchstart'), function(e){ that.touchstart(e) }, false);
        this.element[0].addEventListener(t('touchend'),   function(e){ that.touchend(e) }, false);
    } else {
        this.element.addEventListener(t('touchstart'), function(e){ that.touchstart(e) }, false);
        this.element.addEventListener(t('touchend'),   function(e){ that.touchend(e) }, false);
    }
    if (window.navigator.msPointerEnabled) {
        this.element.css("-ms-touch-action", "none");
        this.msTouch = true;
    }
};

TouchGestures.Press.prototype = {
    touchstart: function(e) {
        clearTimeout(this.timer);
        if (this.msTouch || e.touches.length === this.touches) {
            this.timer = setTimeout(function(){
                this.pressed = true;
                ( window.jQuery === $ ) ? this.element.trigger('scribd:touch:pressstart', [e]) : this.element.fire('scribd:touch:pressstart', [e]);
            }.bind(this), this.delay);
        } else {
            this.pressed = false;
        }
    },

    touchend: function(e) {
        if (this.pressed === true) {
            this.pressed = false;
            e.preventDefault();
            ( window.jQuery === $ ) ? this.element.trigger('scribd:touch:pressend', [e]) : this.element.fire('scribd:touch:pressend', [e]);
        }
        clearTimeout(this.timer);
    }
};


/********** TouchGestures.Swipe **********/
TouchGestures.Swipe = function(name, element, options) {
    this.element    = $(element);
    this.name       = name;
    this.minLength  = options.minLength || 200;
    this.tolerance  = options.tolerance || 100;
    this.swiping    = options.swiping || null;
    this.complete   = options.complete || function(){};
    this.incomplete = options.incomplete || function(){};
    if ( options.orientation === 'X' || options.orientation === 'x' ) {
        this.moveOrientation  = 'X', this.toleranceOrientation  = 'Y';
    } else {
        this.moveOrientation  = 'Y', this.toleranceOrientation = 'X';
    }
    this.direction    = options.direction || 1; // -1:left, 1:right
    this.tracking = false;
    this.originX = null, this.originY = null;
    var that = this;
    if ( window.jQuery === $ ) {
        this.element[0].addEventListener(t('touchstart'), function(e){ that.touchstart(e) }, false);
        this.element[0].addEventListener(t('touchmove'),  function(e){ that.touchmove(e) }, false);
        this.element[0].addEventListener(t('touchend'),   function(e){ that.touchend(e) }, false);
    } else {
        this.element.addEventListener(t('touchstart'), function(e){ that.touchstart(e) }, false);
        this.element.addEventListener(t('touchmove'),  function(e){ that.touchmove(e) }, false);
        this.element.addEventListener(t('touchend'),   function(e){ that.touchend(e) }, false);
    }
    if (window.navigator.msPointerEnabled) {
        this.msTouch = true;
        this.element.css("-ms-touch-action", "none");
        this.pointerId = null;
    }
};

TouchGestures.Swipe.prototype = {
    touchstart: function(e) {
        if ( this.msTouch || e.touches.length === 1 ) {
            this.originX = e.pageX || e.touches[0].clientX;
            this.originY = e.pageY || e.touches[0].clientY;
            this.tracking = true;
            if (this.msTouch)
                this.pointerId = e.pointerId;
        }
    },

    touchmove: function(e) {
        if ( !this.tracking ) return;
        var valid, touch;
        if (this.msTouch) {
            valid = e.pointerId === this.pointerId;
            touch = e;
        } else {
            valid = e.touches.length === 1;
            touch = e.touches[0];
        }
        if ( !(valid && this.validMovingTouch(touch)) ) {
            this.reset();
        } else if ( this.swiping ) {
            this.swiping(e);
        }
    },

    touchend: function(e) {
        if ( !this.tracking ) return;
        var valid, touch;
        if (this.msTouch) {
            valid = e.pointerId === this.pointerId;
            touch = e;
        } else {
            valid = e.touches.length === 0 && e.changedTouches.length === 1;
            touch = e.changedTouches[0];
        }
        if (valid && this.validEndingTouch(touch) ) {
            this.complete(e);
        } else {
            this.incomplete(e);
        }
        this.reset();
    },

    reset: function() {
        if ( this.tracking )  {
            this.tracking = false;
        }
    },

    validEndingTouch: function(touch) {
        return this.validMovingTouch(touch) && this.validMinLength(touch);
    },

    validMovingTouch: function(touch) {
        return this.tracking && this.validDirection(touch) && this.validTolerance(touch);
    },

    validDirection: function(touch) {
        var originPosition = this['origin' + this.moveOrientation];
        var clientPosition = touch['page' + this.moveOrientation] || touch['client' + this.moveOrientation];
        if ( this.direction === 1 ) { return clientPosition >= originPosition; }
        return clientPosition <= originPosition;
    },

    validTolerance: function(touch) {
        return this.movedTolerance(touch) < this.tolerance;
    },

    validMinLength: function(touch) {
        return this.movedDistance(touch) > this.minLength;
    },

    movedTolerance: function(touch) {
        var originPosition = this['origin'  + this.toleranceOrientation];
        var clientPosition = touch['page' + this.toleranceOrientation] || touch['client' + this.toleranceOrientation];
        return Math.abs(originPosition - clientPosition);
    },

    movedDistance: function(touch) {
        var originPosition = this['origin' + this.moveOrientation];
        var clientPosition = touch['page' + this.moveOrientation] || touch['client' + this.moveOrientation];
        if ( this.direction === 1) {
            return Math.abs(clientPosition - originPosition);
        }
        return Math.abs(originPosition - clientPosition);
    }

};





/************************************************************************
 * :asset_packager_compatibility, 'config/asset_packages.yml' (last modified: 2016-07-14 01:06:05 +0000)
 ************************************************************************/





/************************************************************************
 * :files, 'public/javascripts/shared', ... (last modified: (none))
 ************************************************************************/





/************************************************************************
 * :files, 'app/views', ... (last modified: (none))
 ************************************************************************/





/************************************************************************
 * :files, 'app/views', ... (last modified: (none))
 ************************************************************************/





/************************************************************************
 * :class_inlines, 'app/views', ... (last modified: (none))
 ************************************************************************/





/************************************************************************
 * :class_inlines, 'spec_javascripts/js_spec', ... (last modified: (none))
 ************************************************************************/
