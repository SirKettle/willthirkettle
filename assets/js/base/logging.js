var Log = (function () {
	
	var m_bEnabled = false;

	return {
		Enable : function () {
			if (!_.isUndefined(console)) {
				m_bEnabled = true;
			}
		},
		Log : function () {
			if (m_bEnabled && !_.isUndefined(console.log)) {
				if (arguments.length == 1) {
					console.log(arguments[0]);
				}
				else if (arguments.length > 1) {
					console.log(arguments);
				}
			}
		},
		Info : function (sMessage) {
			if (m_bEnabled && !_.isUndefined(console.info)) {
				console.info(sMessage);
			}
			else {
				Log.Log("INFO: " + sMessage);
			}
		},
		Debug : function (sMessage) {
			if (m_bEnabled && !_.isUndefined(console.debug)) {
				console.debug(sMessage);
			}
			else {
				Log.Log("DEBUG: " + sMessage);
			}
		},
		Warn : function (sMessage) {
			if (m_bEnabled && !_.isUndefined(console.warn)) {
				console.warn(sMessage);
			}
			else {
				Log.Log("WARN: " + sMessage);
			}
		},
		Error : function (sMessage) {
			if (m_bEnabled && !_.isUndefined(console.error)) {
				console.error(sMessage);
			}
			else {
				Log.Log("ERROR: " + sMessage);
			}
		}
	};
	
}());