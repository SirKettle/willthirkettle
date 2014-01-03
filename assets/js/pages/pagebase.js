function PageBase(sTitle)
{
	var thisPage = this;
	var m_$Main = $("#content");
	var m_$Page = $("<div>");
	var m_$Title = $("<h2>");
	var m_$Frame = $("<div>").addClass("cFrame cFrame_" + String_RemoveSpaces(sTitle));
	var m_nPageHeight = 0;
	var m_sTitle = sTitle;
	var m_bVisible = false;
	var m_nMinHeight = 275;
	var m_sPageTitle = _.isObject(PageManager.PAGES[m_sTitle]) ? PageManager.PAGES[m_sTitle].title : m_sTitle;

	var Init = function () {
		thisPage.SetTitle(m_sTitle);
		m_$Page.append(
			// m_$Title,
			m_$Frame,
			$("<div>").addClass("clear")
		);
	};

	this.GetTitle = function () {
		return m_sTitle;
	};

	this.SetTitle = function (sNewTitle) {
		m_sTitle = sNewTitle;
		sNewTitle = _.isObject(PageManager.PAGES[m_sTitle]) ? PageManager.PAGES[m_sTitle].title : m_sTitle;
		m_$Title.text(sNewTitle.toUpperCase());
	};

	this.GetFrame = function () {
		return m_$Frame;
	};

	this.GetIsVisible = function () {
		return m_bVisible;
	};
	
	this.Show = function(fCallback){
		if (!_.isFunction(fCallback)) {
			fCallback = function () {};
		}
		
		m_$Page.appendTo(m_$Main).css("opacity", 0);

		m_$Main.removeClass().addClass('cContent cPage_' + m_sTitle);
		
		// var nHeight = Math.max(m_$Page.height(), m_nMinHeight);

		$('body').scrollTop(0);

		document.title = m_sPageTitle + PageManager.DocumentTitlePostFix;
		
		// m_$Main.animate({
		// 		height: nHeight
		// 	},
		// 	400,
		// 	"easeOutQuart",
		// 	function(){
				m_$Page.fadeTo(100, 1, function(){
					m_bVisible = true;
					PageManager.PageRendered();
//					m_$Page.css("height", "auto");
					
					fCallback();
				});
			// });
		
		GoogleAnalyticsHandler.PageView(sTitle);
	};
	
	this.Hide = function(fCallback){
		if (!_.isFunction(fCallback)) {
			fCallback = function () {};
		}
		// var nHeight = Math.max(m_$Page.height(), m_nMinHeight);
		// m_$Main.css("height", nHeight);
		m_$Page.fadeTo(300, 0, function(){
			m_bVisible = false;
			$(this).detach();
			fCallback();
		});
	};

	Init();
}