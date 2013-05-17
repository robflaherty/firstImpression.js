/*
 * firstImpression.js
 * Copyright (c) 2012 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

window.firstImpression = function(cookie, days) {

  var cookieMachine, getCookie, setCookie, checkUser;

  /* Plain JS port of jquery.cookie plugin
   * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
   * Dual licensed under the MIT and GPL licenses.
   */
  
  cookieMachine = function(key, value, options) {
    var expiration, result, time;
    
    if (arguments.length > 1 && String(value) !== "[object Object]") {
      options = options || {};

      if (value === null || value === undefined) {
        options.expires = -1;
      }
      
      if (typeof options.expires === 'number') {
        expiration = options.expires;
        time = options.expires = new Date();
        time.setTime(time.getTime() + expiration * 24 * 60 * 60 * 1000);
      }
      
      // Temporary fix for path problem
      options.path = '/';

      return (document.cookie = [
        encodeURIComponent(key),
        '=',
        encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '',
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join(''));
    }
    
    result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie);
    return result ? decodeURIComponent(result[1]) : null;
  };

  /*
   * Option defaults
   */
  
  if (cookie === undefined) {
    cookie = "_firstImpression";
  }

  if (days === undefined) {
    days = 730;
  }

  /*
   * Delete cookie if either option is null
   */

  if (cookie === null) {
    cookieMachine("_firstImpression", null);
    return;
  }
  
  if (days === null) {
    cookieMachine(cookie, null);
    return;
  }

  /*
   * Functions
   */

  getCookie = function() {
    return cookieMachine(cookie);
  };

  setCookie = function() {
    cookieMachine(cookie, true, {expires: days});
  };

  checkUser = function() {
    var status = getCookie();
    
    // Set cookie if new user
    if (!status) {
      setCookie();
    }

    return !status;
  };

  /*
   * Return boolean
   */

  return checkUser();

};
