
var DeviceManager = (function(){
	
	var m_bMobile = false;
	var m_cDimensions = {};
	var m_$Body = $("body");
	var m_nResizeTimerId = null;
	
	function OnResize()
	{
		var nNewWidth = $(window).width();
		var nNewHeight = $(window).height();
		
		if (nNewWidth != m_cDimensions.Width || nNewHeight != m_cDimensions.Height)
		{
			m_cDimensions.Width = nNewWidth;
			m_cDimensions.Height = nNewHeight;
			clearTimeout(m_nResizeTimerId);
			Log.Log("attempt");
			m_nResizeTimerId = setTimeout(function(){
			Log.Log("OnResize");
				EventDispatcher.TriggerEvent("OnResize", $.extend({}, m_cDimensions));
			}, 50);
		}
	}
	
	return {
		Init: function(){
			m_cDimensions.Width = $(window).width();
			m_cDimensions.Height = $(window).height();
			m_bMobile = (m_cDimensions.Width < 700 && m_cDimensions.Height < 700);
			
			if (m_bMobile)
			{
				$(window).resize(OnResize);
			}
	
			if (typeof window.devicePixelRatio !== "undefined")
			{
				if (window.devicePixelRatio > 1)
				{
					m_$Body.addClass("cHighDef");
				}
				else
				{
					m_$Body.addClass("cStandardDef");
				}
			}
		}
	};	
})();