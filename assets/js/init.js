
$(document).ready(function(){
  // Log.Enable();
	$("#year").text((new Date()).getFullYear());
  ClientStorage.Init('CS_', true);
  DeviceManager.Init();
	PageManager.Init();
});