function AboutPage(sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle));
	var m_sRegId = null;
	
	this.Show = function(){
		
		parent.Frame.empty().append(
			$("<h3>").html("About me..."),
			$("<p>").html("I am currently a Senior Developer at We R Interactive, building social games for multiple platforms."),
			$("<p>").html("Now working on the Tablet and Mobile versions of <a href=\"https://lyroke.com\">LYROKE</a> using responsive design techniques."),
			$("<p>").html("I specialise in frontend/clientside development for web and mobile. I strive to keep up to speed of the latest technologies, currently exploring backbone.js and requirejs. Having come from a creative background I also have a keen eye for detail."),
			$("<p>").html("Previously I was in charge of a small creative development team working on multiple projects including consumer facing white labelled systems in both mortgage comparison and corporate social networking."),
			$("<p>").html("I am highly motivated, passionate about technology, approach challenges logically and grasp new ideas quickly."),
			$("<p>").html("<a href=\"http://uk.linkedin.com/in/thirkettle/\">Read more...</a>")
		);
			
		parent.Show();
	};
	
	this.Hide = function(fOnHide){
//		EventDispatcher.UnbindEvents(m_sRegId);
		parent.Hide(fOnHide);
		parent.Frame.empty();
	};
}

