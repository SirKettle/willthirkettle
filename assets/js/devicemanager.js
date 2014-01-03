
var DeviceManager = (function(){
	
	var m_cDimensions = {},
	
	OnResize = _.throttle(function () {
		var nNewWidth = $(window).width();
		var nNewHeight = $(window).height();
		
		if (nNewWidth != m_cDimensions.Width || nNewHeight != m_cDimensions.Height)
		{
			m_cDimensions.Width = nNewWidth;
			m_cDimensions.Height = nNewHeight;
			EventDispatcher.TriggerEvent("OnResize", $.extend({}, m_cDimensions));
		}
	}, 300);
	
	return {

		Width : function () {
			return m_cDimensions.Width;
		},

		Height : function () {
			return m_cDimensions.Height;
		},

		IsMobile : function () {
			return !!(m_cDimensions.Width < DeviceManager.MobileDimension ||
							m_cDimensions.Height < DeviceManager.MobileDimension);
		},

		Init: function () {
			m_cDimensions.Width = $(window).width();
			m_cDimensions.Height = $(window).height();
			
			// $(window).resize(OnResize);
		}
	};	
})();