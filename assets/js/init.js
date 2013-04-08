
$(document).ready(function(){
	
	var $Date = $("#iCurrentYear");
	var oDate = new Date();
	
	$Date.html(oDate.getFullYear());
	
	PageManager.Init();	
	DeviceManager.Init();
});

