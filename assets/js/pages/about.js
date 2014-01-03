function AboutPage(sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle)),
	    m_sRegId = null,
	    m_$Frame = parent.GetFrame(),
	    m_BlogPosts = new BlogPosts();
	
	this.Show = function(){

		$.get('/assets/html/about.html', function(sHtml) {
			m_$Frame.html(sHtml);
			parent.Show();
			m_BlogPosts.Show(m_$Frame, function () {});
		});
	};
	
	this.Hide = function(fOnHide){
//		EventDispatcher.UnbindEvents(m_sRegId);
		m_BlogPosts.Hide();
		parent.Hide(fOnHide);
		m_$Frame.empty();
	};
}

