function PageBase(sTitle)
{
	var thisPage = this;
	var m_$Main = $("#iPageContent");
	var m_$Page = $("<div>");
	var m_$Frame = $("<div>").addClass("cFrame cFrame_" + String_RemoveSpaces(sTitle));
	var m_nPageHeight = 0;
	
	m_$Page.append(
		$("<h1>").text(sTitle.toUpperCase()),
		m_$Frame,
		$("<div>").addClass("clear")
	);
	
	Object.defineProperty(
		this,
		"Frame",
		{
			get : function(){ return m_$Frame; },  
			enumerable : true,  
			configurable : false
		}
	);
	
	this.Show = function(fCallback){
		
		fCallback = typeof fCallback == "function" ? fCallback : function(){};
		
		m_$Page.appendTo(m_$Main).css("opacity", 0);
		
		var nHeight = Math.max(m_$Page.height(), 200);
		
		m_$Main.animate({
				height: nHeight
			},
			400,
			"easeOutQuart",
			function(){
				m_$Page.fadeTo(100, 1, function(){
					PageManager.PageRendered();
//					m_$Page.css("height", "auto");
					
					fCallback();
				});
			});
		
		GoogleAnalyticsHandler.PageView(sTitle);
	};
	
	this.Hide = function(fCallback){
		var nHeight = Math.max(m_$Page.height(), 200);
		m_$Main.css("height", nHeight);
		m_$Page.fadeTo(300, 0, function(){
			$(this).detach();
			if (typeof fCallback == "function")
			{
				fCallback();
			}
		});
	};
}