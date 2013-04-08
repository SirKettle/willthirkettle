function ViewBase(sClass)
{
	var m_$View = $("<div>").addClass("cLM_View");
	
	if (typeof sClass == "string")
	{
		m_$View.addClass(sClass);
	}
	
	Object.defineProperty(
		this, 
		"View", 
		{
			get : function(){ return m_$View; },  
			enumerable : true,  
			configurable : false
		}
	);
	
	this.Show = function($Target, bPrepend){
		
		bPrepend = typeof bPrepend == "boolean" ? bPrepend : false;
		
		if (bPrepend)
		{
			m_$View.prependTo($Target);
		}
		else
		{
			m_$View.appendTo($Target);
		}
	};
	
	this.Hide = function(){
		m_$View.detach();
	};
	
	this.Destroy = function(){
		m_$View.remove();
	};
}