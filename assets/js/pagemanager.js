
var PageManager = (function(){
	var m_cPages = {},
	    m_sCurrentPageKey = null,
	    m_bInTransition = false,
	    m_$Nav = $('#navigation'),
	    m_$Body = $('body'),
	    m_$Footer = $('.cPage > footer'),
	    m_$MenuOpen = $('.cPage > header > button'),
	    m_$MenuClose = $('.cBody > nav > div > button'),
	    m_aThemes = ['standard', 'code', 'bootstrap', 'covert'],
	
	GetNavClass = function (sPageKey) {
		return 'cNav_' + String_RemoveSpaces(sPageKey);
	},
	
	RegisterPage = function (sPageKey, cView) {
		if (_.isUndefined(m_cPages[sPageKey])) {
			var cGoogleAnanlyticsUrl = {};
			m_cPages[sPageKey] = new cView(sPageKey);
			cGoogleAnanlyticsUrl[sPageKey] = '/#!' + sPageKey;
			GoogleAnalyticsHandler.RegisterUrls(cGoogleAnanlyticsUrl);
		}
	},

	GetPageFromHash = function () {
		var sPage = PageManager.DEFAULT_PAGE,
		    aPage = location.hash.toString().split('#!');

		if (aPage.length === 2 && !_.isUndefined(m_cPages[aPage[1]])) {
			sPage = aPage[1];
		}

		return sPage;
	},

	SaveHistory = function (cPageArgs, bSaveHistory) {
		if (bSaveHistory
				&& !_.isUndefined(window.history)
				&& _.isFunction(window.history.pushState)) {
			window.history.pushState(cPageArgs, cPageArgs.PageKey, '/#!' + cPageArgs.PageKey);
		}
	},
	
	ShowPage = function (cArgs, bSaveHistory) {

		// Log.Log('ShowPage', cArgs);

		if (!m_bInTransition) {

			if (!_.isUndefined(cArgs) &&
				_.isString(cArgs.PageKey) &&
				!_.isUndefined(m_cPages[cArgs.PageKey])) {

				var cCurrentPage = m_cPages[cArgs.PageKey];
						
				if (m_sCurrentPageKey && !_.isUndefined(m_cPages[m_sCurrentPageKey])) {

					if (cArgs.PageKey != m_sCurrentPageKey) {

						var cPreviousPage = m_cPages[m_sCurrentPageKey];
						
						m_bInTransition = true;
						cPreviousPage.Hide(function(){
							cCurrentPage.Show(cArgs);
							SaveHistory(cArgs, bSaveHistory);
						});
						m_sCurrentPageKey = cArgs.PageKey;
					}
				} else {

					m_bInTransition = true;
					cCurrentPage.Show(cArgs);
					SaveHistory(cArgs, bSaveHistory);
					m_sCurrentPageKey = cArgs.PageKey;
				}
						
				m_$Nav.children().removeClass('on');
				m_$Nav.children('.' + GetNavClass(m_sCurrentPageKey)).addClass('on');
			}
		}
	},

	SetEnvironment = function () {
		if (DeviceManager.IsMobile()) {
			SetMobile();
		} else {
			SetDesktop();
		}
	},

	SetMobile = function () {
	},

	SetDesktop = function () {
	},

	OpenMenu = function () {
		m_$Body.addClass('openNav');
	},

	CloseMenu = function () {
		m_$Body.removeClass('openNav');
	},

	AddThemes = function () {
		var $Themes = $('<select>'),
				sCurrentTheme = ClientStorage.Get('theme') || m_aThemes[0];
		// populate the options
		_.each(m_aThemes, function (sTheme) {
			$('<option>').text(sTheme).val(sTheme).appendTo($Themes);
		});
		// update selected option
		$Themes.val(sCurrentTheme);
		// set the current theme
		PageManager.SetTheme(sCurrentTheme);

		$Themes.appendTo(m_$Footer).on('change', function() {
			PageManager.SetTheme(this.value);
		});
	},

	OnHashChange = function () {
		// This catches hash changes (ie in links)
		var sPageFromHash = GetPageFromHash();
		Log.Log('onpopstate - hash change (link)', sPageFromHash);

		if (sPageFromHash !== m_sCurrentPageKey) {
			PageManager.ShowPage({PageKey: sPageFromHash}, false);
		}
	};
	
	return {
		Init : function () {

			// Bind to custom events
			EventDispatcher.BindEvents({
				OnResize: function(cDimensions){
					if (m_sCurrentPageKey){
						var cCurrentPage = m_cPages[m_sCurrentPageKey];
						
						cCurrentPage.Hide(function(){
							cCurrentPage.Show();
						});
					}

					SetEnvironment();
				}
			});

			// Initialise the theme options
			// AddThemes();
		
			for (var sPage in PageManager.PAGES) {
				RegisterPage(sPage, PageManager.PAGES[sPage].view);
			}

			// Build the nav
			m_$Nav.empty();

			// So far only tested on chrome - but this seems to catch browser navigation
			// button changes (back/forward) and hash changes (links)
			if (!_.isUndefined(window.onpopstate)) {
				window.onpopstate = function (event) {
					if (event.state) {
						// This is when the user is using the back/forward buttons
						Log.Log('onpopstate - navigation buttons', event.state.PageKey);
						PageManager.ShowPage(event.state, false);
					} else {
						OnHashChange();
					}
				};
			
				// maybe get rid of these click events and just use the links below?
				_.each(PageManager.NAV, function (sPageKey) {
					$('<li>').addClass(GetNavClass(sPageKey))
						.append($('<span>').text(sPageKey))
						.click(function(){
							PageManager.ShowPage({PageKey: sPageKey});
							CloseMenu();
						})
						.appendTo(m_$Nav);
				});

			} else {
				// for ie and older browsers - no onpopstate support
				window.onhashchange = OnHashChange;

				// these links will trigger a hash change
			  _.each(PageManager.NAV, function (sPageKey) {
			    $('<li>').addClass(GetNavClass(sPageKey))
			      .append($('<a>').text(sPageKey).attr({ href : '/#!' + sPageKey }))
			      .appendTo(m_$Nav);
			  });
			}
			
			PageManager.ShowPage({PageKey: GetPageFromHash()});
			m_$MenuOpen.on('click', OpenMenu);
			m_$MenuClose.on('click', CloseMenu);

			SetEnvironment();

			$('body').removeClass('cNotReady');
		},
		ShowPage : function (cArgs, bSaveHistory) {
			var nShowDelay = null,
			    nLastPageClickTime = 0,
			    sPrevPageClicked = '',
			    nTime = (new Date()).getTime();

			bSaveHistory = _.isBoolean(bSaveHistory) ? bSaveHistory : true;

			clearTimeout(nShowDelay);

			if (nTime - nLastPageClickTime < 500 && sPrevPageClicked != cArgs.PageKey)
			{
				nShowDelay = setTimeout(function(){
					ShowPage(cArgs, bSaveHistory);
				}, 500);
			}
			else
			{
				ShowPage(cArgs, bSaveHistory);
			}

			nLastPageClickTime = nTime;
			sPrevPageClicked = cArgs.PageKey;

		},
		GoHome : function () {
			PageManager.ShowPage({PageKey: PageManager.DEFAULT_PAGE});
		},
		PageRendered : function () {
			m_bInTransition = false;
		},
		// sets a theme (class on the body. ie theme_blue) - uses local storage
		SetTheme : function (sChosenTheme) {
			var sClassFunction;
			// store the theme on storage
			ClientStorage.Set('theme', sChosenTheme);
			// update the body's theme class
			_.each(m_aThemes, function (sTheme) {
				sClassFunction = sChosenTheme === sTheme ? 'addClass' : 'removeClass';
				m_$Body[sClassFunction]('theme_' + sTheme);
			});
		}
	};
}());
PageManager.TRANSITION_TIME = 333;
