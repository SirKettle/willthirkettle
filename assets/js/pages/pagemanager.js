
var PageManager = (function(){
	
	var m_cPages = {};
	var m_sCurrentPageKey = null;
	var m_cCurrentPageArgs = null;
	var m_bInTransition = false;
	var m_$MainNav = $("#iMainNavigation");
	var m_$MobileNav = $("#iMobileNavigation");
	
	function GetNavClass(sPageKey)
	{
		return "cNav_" + String_RemoveSpaces(sPageKey);
	}
	
	function RegisterPage(sPageKey, cView)
	{
		if (typeof m_cPages[sPageKey] == "undefined")
		{
			var cGoogleAnanlyticsUrl = {};
			
			m_cPages[sPageKey] = new cView(sPageKey);
			cGoogleAnanlyticsUrl[sPageKey] = String_RemoveSpaces(sPageKey.toLowerCase());
			GoogleAnalyticsHandler.RegisterUrls(cGoogleAnanlyticsUrl);
		}
	}
	
	function ShowPage(cArgs)
	{
		if (! m_bInTransition)
		{
			if (typeof cArgs != "undefined" &&
				typeof cArgs.PageKey == "string" &&
				typeof m_cPages[cArgs.PageKey] != "undefined")
			{
				m_cCurrentPageArgs = cArgs;
			
				var cCurrentPage = m_cPages[cArgs.PageKey];
						
				if (m_sCurrentPageKey && typeof m_cPages[m_sCurrentPageKey] != "undefined")
				{
					if (cArgs.PageKey != m_sCurrentPageKey)
					{
						var cPreviousPage = m_cPages[m_sCurrentPageKey];
						
						m_bInTransition = true;
						cPreviousPage.Hide(function(){
							cCurrentPage.Show();
						});
						m_sCurrentPageKey = cArgs.PageKey;
					}
				}
				else
				{
					m_bInTransition = true;
					cCurrentPage.Show(cArgs);
					m_sCurrentPageKey = cArgs.PageKey;
				}
						
				m_$MainNav.children().removeClass("on");
				m_$MainNav.children("." + GetNavClass(m_sCurrentPageKey)).addClass("on");
			}
		}
	}
	
	EventDispatcher.BindEvents({
		OnResize: function(cDimensions){
			if (m_sCurrentPageKey)
			{
				var cCurrentPage = m_cPages[m_sCurrentPageKey];
				
				Log.Log(m_cCurrentPageArgs);
				cCurrentPage.Hide(function(){
					m_sCurrentPageKey = null;
					PageManager.ShowPage(m_cCurrentPageArgs);
				});
			}
			
		}
	});
	
	return {
		Init: function(){
			
			for (var sPage in PageManager.PAGES)
			{
				RegisterPage(sPage, PageManager.PAGES[sPage]);
			}
			
			for (var nIndex = 0; nIndex < PageManager.NAV.length; ++nIndex)
			{
				(function(sPageKey){
					$("<li>").addClass(GetNavClass(sPageKey)).text(sPageKey).click(function(){
						PageManager.ShowPage({PageKey: sPageKey});
					}).appendTo(m_$MainNav);
					$("<option>").text(sPageKey).val(sPageKey).appendTo(m_$MobileNav);
				})(PageManager.NAV[nIndex]);
			}
			
			m_$MobileNav.on('change', function() {
				PageManager.ShowPage({PageKey: this.value});
			});
			
			var sDefaultPage = "Home";
			var sFirstPage = sDefaultPage;		
			var sQueryString = location.search.substring(1);
			
			if (sQueryString.length > 0)
			{
				var cQueryParams = {};
				var cRegExp = /([^&=]+)=([^&]*)/g;
				var aMatch;

				while (aMatch = cRegExp.exec(sQueryString))
				{
					cQueryParams[decodeURIComponent(aMatch[1])] = decodeURIComponent(aMatch[2]);
				}

				if (typeof cQueryParams["Page"] == "string" && typeof m_cPages[cQueryParams["Page"]] != "undefined")
				{
					sFirstPage = cQueryParams["Page"];
				}
			}
			
			PageManager.ShowPage({PageKey: sFirstPage});
			
		},
		ShowPage: function(cArgs){
			var nShowDelay = null;
			var nLastPageClickTime = 0;
			var sPrevPageClicked = "";
			var nTime = (new Date()).getTime();

			clearTimeout(nShowDelay);

			if (nTime - nLastPageClickTime < 500 && sPrevPageClicked != cArgs.PageKey)
			{
				nShowDelay = setTimeout(function(){
					ShowPage(cArgs);
				}, 500);
			}
			else
			{
				ShowPage(cArgs);
			}

			nLastPageClickTime = nTime;
			sPrevPageClicked = cArgs.PageKey;

		},
		PageRendered: function(){
			m_bInTransition = false;
			//Log.Log("- - - PageRendered: Transition = false");
			//Log.Log("================================");
		}
	};
})();

PageManager.PAGES = {
	Home: HomePage,
	About: AboutPage,
	Contact: ContactPage
};
PageManager.NAV = [ "Home", "About", "Contact" ];
PageManager.TRANSITION_TIME = 333;
