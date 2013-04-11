function ContactPage(sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle));
	var m_sRegId = null;
	
	this.Show = function(){
		
		parent.Frame.empty().append(
			"<h3>Contact me...</h3>" +
			"<ul>" +
				"<li><a href=\"mailto:will@thekettlestudio.co.uk\">Email - will@thekettlestudio.co.uk</a></li>" +
				"<li><a href=\"https://www.facebook.com/willthirkettle\">Facebook - http://uk.linkedin.com/in/thirkettle/</a></li>" + 
				"<li><a href=\"http://uk.linkedin.com/in/thirkettle/\">LinkedIn - http://uk.linkedin.com/in/thirkettle/</a></li>" +
				"<li><a href=\"https://github.com/SirKettle\">GitHub - https://github.com/SirKettle</a></li>" +
			"</ul>"
		);
			
		parent.Show();
	};
	
	this.Hide = function(fOnHide){
//		EventDispatcher.UnbindEvents(m_sRegId);
		parent.Hide(fOnHide);
		parent.Frame.empty();
	};
}

