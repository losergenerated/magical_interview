/************************************************************************
 * 'stats.js'
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
   - public/javascripts/document_url.js (last modified: 2015-11-10 00:53:02 +0000)
   ---------------------------------------------------------------------- */
if (!window.Scribd) Scribd = {};

Scribd.DocumentUrl = {
  // Make it work with other hosts?
  urlByDocId: function(doc_id, options){
                if (!options) options = {};
                var host = options.env == "production" ? "scribd.com" : window.location.hostname;
                var port = options.env == "production" ? 80 : window.location.port;

                var prefix = "/doc/"
                if (options.prefix)
                  prefix = options.prefix

                var url = prefix + doc_id;

                if (!options.relative_path){
                  if(port && port != 80 && port != 443)
                    port = ":" + port;
                  else
                    port = "";

                  url = "http://" + host + port + url;
                }

                if (options.slug)
                  url += "/" + options.slug;

                if (options.secret_password && options.secret_password.length > 0)
                  url += "?secret_password=" + options.secret_password;

                return url;
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

