
function SwiperView(cArgs)
{
	var m_cSettings = $.extend({
		ImagePath: "",
		ThumbPath: null,
		Type: 'images',
		Controls: true,
		TransitionSpeed: 400,
		TransitionDelay: 4000,
		Loops: true,
		FirstSwipeDelay: m_bMobile ? 200 : null
	}, cArgs);
	var parent = ExtendClass(this, new ViewBase("cSwiperView"));
	var m_$Content = $("#content");
	var m_aRatio = [732, 450];
	var m_nWidth = m_aRatio[0];
	var m_nHeight = m_aRatio[1];
	var m_bMobile = false;
	var m_nItemCount = 0;
	var m_$Dots = $("<div>").addClass("cDots");
	var m_$View = parent.GetView();
	
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
		
		var $Container = $("<div>").addClass("swiper-container").appendTo(m_$View).width(m_nWidth).height(m_nHeight);
		var $Wrapper = $("<div>").addClass("swiper-wrapper").appendTo($Container);
		
		if (m_bMobile)
		{
			m_$Dots.empty().removeClass().addClass("cDots").appendTo(m_$View).show();
			
			for (var i = 0; i < m_nItemCount; ++i)
			{
				m_$Dots.append(
					$('<span>').html(' &bull; ')
						.addClass('cDot_' + i + (i === 0 ? ' on' : ''))
				);
			}

			if (m_nItemCount > 20) {
				m_$Dots.addClass("cShedLoads");
			} else if (m_nItemCount > 15) {
				m_$Dots.addClass("cBucketLoads");
			} else if (m_nItemCount > 10) {
				m_$Dots.addClass("cLoads");
			}

			if (m_nItemCount === 1) {
				m_$Dots.hide();
			}
		}

		for (var nIndex = 0; nIndex < m_nItemCount; ++nIndex)
		{
			(function(sItem){
				var $Slide = $("<div>").addClass('swiper-slide').width(m_nWidth).height(m_nHeight);
				switch (m_cSettings.Type) {
					case 'images':
						$Slide.css({
							background: "url('" + m_cSettings.ImagePath + sItem + "') no-repeat center 0",
							backgroundSize: "contain"
						});
						break;
					case 'html':
						$Slide.html(sItem);
						break;
				}
				$Slide.appendTo($Wrapper);
			})(aItems[nIndex]);
		}

		_.each(aItems, function (cItem) {
			var sItem = _.isString(cItem) ? cItem : cItem.Image,
			    $Slide = $("<div>").addClass('swiper-slide').width(m_nWidth).height(m_nHeight);
			
			switch (m_cSettings.Type) {
				case 'images':

					if (_.isObject(cItem) && cItem.Url) {
						$Slide.on('click', function () {
							window.location.href = cItem.Url;
						});
					}

					$Slide.css({
						background: "url('" + m_cSettings.ImagePath + sItem + "') no-repeat center 0",
						backgroundSize: "contain"
					});
					break;
				case 'html':
					$Slide.html(sItem);
					break;
			}

			$Slide.appendTo($Wrapper);
		});
		
		fOnReady();
	};
	
	this.SwipeInit = function(){
		if (m_nItemCount > 1) {
			var cSwiperArgs = {
				loop: m_cSettings.Loops,
				autoPlay: m_cSettings.TransitionDelay,
				speed: m_cSettings.TransitionSpeed,
				onSlideChangeEnd : function(args, s) {
					if (m_bMobile) {
						m_$Dots.children().removeClass('on');
						m_$Dots.children('.cDot_' + cSwiper.activeSlide).addClass('on');
					}
				}
			};
			
			if (!m_bMobile) {
				cSwiperArgs.onlyExternal = true;	
			}
			
			var cSwiper = $(".swiper-container").swiper(cSwiperArgs);

			if (!m_bMobile && m_cSettings.Controls) {
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
				
				m_$View.append(
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

			if (m_cSettings.FirstSwipeDelay) {
				setTimeout(cSwiper.swipeNext, m_cSettings.FirstSwipeDelayv);
			}
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
