
function SwiperView(cArgs)
{
	var m_cSettings = $.extend({
		ImagePath: "",
		ThumbPath: null
	}, cArgs);
	var parent = ExtendClass(this, new ViewBase("cSwiperView"));
	var m_$Content = $("#iPageContent");
	var m_aRatio = [732, 450];
	var m_nWidth = m_aRatio[0];
	var m_nHeight = m_aRatio[1];
	var m_bMobile = false;
	var m_nItemCount = 0;
	
	// Public Methods
	this.Show = function($Target, aItems, fOnReady){
		
		parent.Show($Target);
		m_nItemCount = aItems.length;
		m_bMobile = m_$Content.width() < m_nWidth;
		
		if (m_bMobile)
		{
			m_nWidth = m_$Content.width();
			m_nHeight = Math.round(m_nWidth * (m_aRatio[1] / m_aRatio[0]));
		}
		
		var $Container = $("<div>").addClass("swiper-container").appendTo(parent.View).width(m_nWidth).height(m_nHeight);
		var $Wrapper = $("<div>").addClass("swiper-wrapper").appendTo($Container);
		
		if (m_bMobile)
		{
			var $Dots = $("<p>").addClass("cDots").appendTo(parent.View);
			
			for (var i = 0; i < m_nItemCount && i < 10; ++i)
			{
				$Dots.append(" &bull; ");
			}
		}

		for (var nIndex = 0; nIndex < m_nItemCount; ++nIndex)
		{
			(function(sImage){
				
				$Wrapper.append("<div class=\"swiper-slide\" style=\"width:" + m_nWidth + "px;height:" + m_nHeight + "px;background-image:url('" + m_cSettings.ImagePath + sImage + "');\"></div>");
			})(aItems[nIndex]);
		}
		
		fOnReady();
	};
	
	this.SwipeInit = function(){
		
		var cSwiperArgs = {};
		
		if (m_bMobile)
		{
			Log.Log("Mobile version - show dots, start autoplay earlier");

			cSwiperArgs = {
				loop: true,
				autoPlay: 4000,
				speed: 400
			};
		}
		else
		{
			Log.Log("Web - show arrows - disable drag and drop");

			cSwiperArgs = {
				loop: true,
				autoPlay: 4000,
				speed: 400,
				onlyExternal:true
			};
		}
		

		var cSwiper = $(".swiper-container").swiper(cSwiperArgs);
		
		if (m_bMobile)
		{
			setTimeout(cSwiper.swipeNext, 200);
		}
		else
		{
			var bPlaying = true;
			var $PlayPause = $("<div>").addClass("cPlayPause cPlaying");
			
			var fPause = function(){
				if (bPlaying)
				{
					bPlaying = false;
					cSwiper.stopAutoPlay();
					$PlayPause.removeClass("cPlaying");
				}
			};
			
			parent.View.append(
				$("<div>").addClass("cPrevArrow").click(function(){ fPause(); cSwiper.swipePrev(); }),
				$("<div>").addClass("cNextArrow").click(function(){ fPause(); cSwiper.swipeNext(); }),
				$PlayPause
			);
			
			$PlayPause.click(function(){
				if (bPlaying)
				{
					fPause();
				}
				else
				{
					bPlaying = true;
					cSwiper.swipeNext();
					cSwiper.startAutoPlay();
					$PlayPause.addClass("cPlaying");
				}				
			});
		}
	};
	
	this.Hide = function(){
		parent.Hide();
	};
}

//
//
////Movies App
//var swiperMovies = $('.mc-posters').swiper({
//	mode : "horizontal", 
//	onlyExternal : true,
//	speed:1000
//});
//var allowMovieClick = true
//var swiperMControl = $('.mc-control').swiper({
//	mode : "horizontal", 
//	scrollContainer:true,
//	onTouchMove : function(){
//		allowMovieClick = false	
//	},
//	onTouchEnd : function() {
//		setTimeout(function(){allowMovieClick = true},100)	
//	}
//});
//$('.mc-control img').bind('mousedown',function(e){
//	e.preventDefault()
//})
//$('.mc-control img').bind('click',function(e){
//	e.preventDefault()
//	if (!allowMovieClick) return;
//	var index = $(this).index()
//	swiperMovies.swipeTo ( index )
//	$('.mc-control .active').removeClass('active')
//	$(this).addClass('active')
//})
