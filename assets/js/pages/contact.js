function ContactPage(sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle));
	var m_sRegId = null;
	
	this.Show = function(){
		
		parent.Frame.empty().append(
			"<h3>Contact me...</h3>",
			$("<p>").text("Contact details here...")
		);
			
		parent.Show();
	};
	
	this.Hide = function(fOnHide){
//		EventDispatcher.UnbindEvents(m_sRegId);
		parent.Hide(fOnHide);
		parent.Frame.empty();
	};
}

