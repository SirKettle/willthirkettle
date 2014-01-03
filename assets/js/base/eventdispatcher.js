/**
 * EventDispatcher - Used for registering and trigger events
 * 
 * Example Usage: EventDispatcher.TriggerEvent("Action", "Parameter");
 * 
 * Required Includes: /corejs/base/base.js
 */

var EventDispatcher = (function(){
	
	var m_cRegisteredEvents = {};
	
	return {
		BindEvents: function(cEvents, sNamespace){
			sNamespace = (sNamespace !== undefined) ? sNamespace : "*";
			
			var sRegId = GetUID();
			
			for (var sEvent in cEvents)
			{
				if (m_cRegisteredEvents[sEvent] === undefined)
				{
					m_cRegisteredEvents[sEvent] = {};
				}
				
				if (m_cRegisteredEvents[sEvent][sNamespace] === undefined)
				{
					m_cRegisteredEvents[sEvent][sNamespace] = {};
				}
				
				m_cRegisteredEvents[sEvent][sNamespace][sRegId] = cEvents[sEvent];
			}
			
			return sRegId;
		},
		UnbindEvents: function(sRegId){
			
			if (sRegId)
			{
				for (var sEvent in m_cRegisteredEvents)
				{
					for (var sNamespace in m_cRegisteredEvents[sEvent])
					{
						delete m_cRegisteredEvents[sEvent][sNamespace][sRegId];
					}
				}
			}
		},
		TriggerEvent: function(sEvent, cParams, sNamespace){
			sNamespace = (sNamespace !== undefined) ? sNamespace : "*";
			
			var sRegisterId = "";
			
			if (m_cRegisteredEvents[sEvent] !== undefined)
			{
				if (sNamespace == "*")
				{
					for (sNamespace in m_cRegisteredEvents[sEvent])
					{
						for (sRegisterId in m_cRegisteredEvents[sEvent][sNamespace])
						{
							m_cRegisteredEvents[sEvent][sNamespace][sRegisterId](cParams);
						}
					}
				}
				else if (m_cRegisteredEvents[sEvent][sNamespace] !== undefined)
				{
					for (sRegisterId in m_cRegisteredEvents[sEvent][sNamespace])
					{
						m_cRegisteredEvents[sEvent][sNamespace][sRegisterId](cParams);
					}
				}
			}
		},
		Get: function(){
			Log.Warn("Get function deprecated! Avoid using where possible");
			return EventDispatcher;
		}
	};
}());