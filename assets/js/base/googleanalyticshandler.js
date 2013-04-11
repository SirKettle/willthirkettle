
var GoogleAnalyticsHandler = (function(){
	
	var m_cUrls = {};
	
	var fTrackPageView = function(sUrl){
		if (typeof _gaq != "undefined" && _gaq)
		{
			_gaq.push(['_trackPageview', sUrl]);
		}
	};
	
	return {
		RegisterUrls: function(cUrls){
			$.extend(m_cUrls, cUrls);
		},
		PageView: function(sPage){
			if (typeof m_cUrls[sPage] == "string")
			{
				fTrackPageView(m_cUrls[sPage]);
			}
		},
		TrackPageView: function(sUrl){
			fTrackPageView(sUrl);
		}
	};
})();

GoogleAnalyticsHandler.CODE = "UA-40085503-1";

var _gaq = _gaq || [];
_gaq.push(['_setAccount', GoogleAnalyticsHandler.CODE]);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();