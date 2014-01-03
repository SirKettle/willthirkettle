function ContactPage(sTitle)
{
	var parent = ExtendClass(this, new PageBase(sTitle));
	var m_sRegId = null;
	var m_$Frame = parent.GetFrame();
	
	this.Show = function(){

		$.get('/assets/html/contact_page.html', function(sContactHtml) {
		  
		  // var sHtml = '<p>If you have any questions, please give us a call</p>';

			// // if ($(window).width() > 600) {
			// 	sHtml += '<div id="map-canvas" class="mapWrapper"></div>'
			// // }

			// sHtml += '</div>';

			m_$Frame.html(sContactHtml);

			parent.Show();

	  //   // Enable the visual refresh
			// // google.maps.visualRefresh = true;

			// var theWorkshop = new google.maps.LatLng(52.537193, 1.355964);

	  //   var map = new google.maps.Map(document.getElementById("map-canvas"), {
	  //     center: theWorkshop,
	  //     // cid: 5779555002704752917,
	  //     zoom: 12,
	  //     mapTypeId: google.maps.MapTypeId.ROADMAP
	  //   });

	  //   var infowindow = new google.maps.InfoWindow({
			//     content: '<div class="mapsInfo"><h3>THE FITTED FURNITURE CO.</h3><p>Wood Farm Barn, High Green, Brooke, NR15 1JE</p></div>'
			// });

			// var marker = new google.maps.Marker({
			//     position: theWorkshop,
			//     map: map,
			//     title:"Workshop"
			// });

			// google.maps.event.addListener(marker, 'click', function() {
			//   infowindow.open(map,marker);
			// });
		});
			
	};
	
	this.Hide = function(fOnHide){
//		EventDispatcher.UnbindEvents(m_sRegId);
		parent.Hide(fOnHide);
		m_$Frame.empty();
	};
}

