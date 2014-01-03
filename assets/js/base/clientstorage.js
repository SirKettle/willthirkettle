
/*
 * Local Storage interface to store/retrieve information on the client
 * Uses localStorage if supported with an optional cookie fallback
 */

var ClientStorage = (function(){
  
  // member variables
  var m_sNamespace = "cs_";
  var m_bUseLocalStorage = false;
  var m_bUseCookies = false;
  
  // credit: cookie code based on mdn - https://developer.mozilla.org/en-US/docs/DOM/document.cookie
  var CookieHandler = {
    getItem: function (sKey) {
      if (!sKey || !this.hasItem(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toGMTString();
            break;
        }
      }
      document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function (sKey, sPath) {
      if (!sKey || !this.hasItem(sKey)) { return; }
      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
    },
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
  };
  
  return {
    Init: function(sNamespace, bCookiesFallback){
      m_sNamespace = typeof sNamespace === "string" ? sNamespace : m_sNamespace;
      m_bUseLocalStorage = typeof window.localStorage !== "undefined";
      
      if (!m_bUseLocalStorage)
      {
        m_bUseCookies = typeof bCookiesFallback == "boolean" ? bCookiesFallback : false;
      }
    },
    Get: function(sKey, defaultReturnValue){
  
      var ret = null;
      
      if (typeof sKey === "string")
      {
        if (m_bUseLocalStorage)
        {
          ret = window.localStorage.getItem(m_sNamespace + sKey);
        }
        else if (m_bUseCookies)
        {
          ret = CookieHandler.getItem(m_sNamespace + sKey);
        }

        if (typeof ret === "string")
        {
          var cValue = JSON.parse(ret);

          if (typeof cValue.Val !== "undefined")
          {
            ret = cValue.Val;
          }
        }
      }
    
      if (ret === null && typeof defaultReturnValue !== "undefined")
      {
        ret = defaultReturnValue;
      }
    
      return ret;
    },
    Set: function(sKey, Value){
  
      if (typeof sKey === "string" && typeof Value !== "undefined")
      {
        var sValue = JSON.stringify({ Val: Value });
        
        if (m_bUseLocalStorage)
        {
          window.localStorage.setItem(m_sNamespace + sKey, sValue);
        }
        else if (m_bUseCookies)
        {
          CookieHandler.setItem(m_sNamespace + sKey, sValue);
        }
      }
    },
    Remove: function(sKey){
  
      if (typeof sKey === "string")
      {
        if (m_bUseLocalStorage)
        {
          window.localStorage.removeItem(m_sNamespace + sKey);
        }
        else if (m_bUseCookies)
        {
          CookieHandler.removeItem(m_sNamespace + sKey);
        }
      }
    }
  };
})();