
function Gallery(cArgs)
{
	var m_cSettings = $.extend({
		ImagePath: "",
		ThumbPath: null,
		Args: {
			directionNav: false
		}
	}, cArgs);
	var parent = ExtendClass(this, new ViewBase("cGalleryView slider-wrapper"));
	var m_$Slider = $("<div>").addClass("cSlider nivoSlider").appendTo(parent.View);
	var m_nItemCount = 0;
	var m_bShowThumbs = m_cSettings.ThumbPath !== null;
	
	// Public Methods
	this.Show = function($Target, aItems, fOnReady){
		
		parent.Show($Target);
		
		m_nItemCount = aItems.length;

		for (var nIndex = 0; nIndex < m_nItemCount; ++nIndex)
		{
			(function(sImage){
				m_$Slider.append(m_bShowThumbs ? "<img src=\"" + m_cSettings.ImagePath + sImage + "\" alt=\"\" data-transition=\"fade\" data-thumb=\"" + m_cSettings.ThumbPath + sImage + "\" />" : "<img src=\"" + m_cSettings.ImagePath + sImage + "\" alt=\"\" data-transition=\"fade\" />");
			})(aItems[nIndex]);
		}
		
		m_$Slider.nivoSlider($.extend({
			controlNavThumbs: m_bShowThumbs,
			animSpeed: 300,
			afterLoad: function(){
				
				if (m_bShowThumbs)
				{
					var nNavMaxWidth = 732;
					var nWidth = 114;
					var nHeight = 96;
					var nMarginRight = 10;
					
					if (m_nItemCount > 6)
					{
						var nAWidth = (nNavMaxWidth - ((m_nItemCount - 1) * nMarginRight)) / m_nItemCount;
						var nRatio = nAWidth/nWidth;
						var nAHeight = nRatio * nHeight;
						var nActualWidth = (Math.floor(nAWidth + nMarginRight) * m_nItemCount) - nMarginRight;
						var nContainerMarginLeft = Math.floor((nNavMaxWidth - nActualWidth) * 0.5);
						
						$("head").append("<style>.nivo-controlNav {margin-left:" + Math.floor(nContainerMarginLeft) + "px;}.nivo-controlNav a.nivo-control img{ width: " + Math.floor(nAWidth) + "px; height: " + Math.floor(nAHeight) + "px;}</style>");
					}
					else
					{
						$("head").append("<style>.nivo-controlNav {margin-left:0;}.nivo-controlNav a.nivo-control img{ width: " + nWidth + "px; height: " + nHeight + "px;}</style>");
					}
				}
				
				fOnReady();
			}
		}, m_cSettings.Args));
	};
	
	this.Hide = function(){
		parent.Hide();
	};
}
