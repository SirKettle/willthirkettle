
// http://www.hamweather.com/account/content/p/id/2/
// William Thirkettle
// Consumer ID       - lg3zYjRbNthJBbvIv9t6O
// Consumer Secret   - ReYt1UjjK9bppY14qlnuPiG9VrC07SqbR1vJWbfD
// Domain/Identifier - willthirkettle.co.uk

function WeatherModule () {
  var parent = ExtendClass(this, new ViewBase("weather")),
      m_$View = parent.GetView(),
      authKeys = {
        client_id     : 'lg3zYjRbNthJBbvIv9t6O',
        client_secret : 'ReYt1UjjK9bppY14qlnuPiG9VrC07SqbR1vJWbfD'
      },

  getWeather = function (aCoords) {
    var $mapCanvas = $('<div id="map-canvas" class="mapWrapper"></div>'),
        $overlay = $('<div class="overlay"></div>'),
        haveCoords = _.isObject(aCoords),
        payload = _.extend({}, authKeys, {
          p : haveCoords ? (aCoords.latitude + ',' + aCoords.longitude) : ':auto'
        });

    $.ajax({
        url  : 'http://api.aerisapi.com/places',
        data : payload,
        dataType : 'jsonp'
      }).done(function (oPlaceData) {
        if (oPlaceData.success == true) {
          var place = oPlaceData.response.place,
              loc = oPlaceData.response.loc,
              ob, theDate, pointer, map;

          $.ajax({
              url  : 'http://api.aerisapi.com/observations',
              data : payload,
              dataType : 'jsonp'
            }).done(function (aWeatherData) {
              if (aWeatherData.success == true) {
                ob = aWeatherData.response.ob;
                theDate = new Date(ob.timestamp*1000);
                // append the title based on location settings
                m_$View.html('<hr>');
                if (haveCoords) {
                  m_$View.append('<h3>Your local weather summary</h3>');
                  loc.lat = aCoords.latitude;
                  loc.long = aCoords.longitude;
                }
                else {
                  m_$View.append(
                    '<h3>Your not so local weather summary</h3>', 
                    '<p>For a more accurate location, please allow location services...</p>'
                  );
                }

                $mapCanvas.append($overlay).appendTo(m_$View);
                $overlay.html('<small>Report at ' + getDateHtml(theDate) + '</span>');

                if (haveCoords) {
                  $overlay.append('<p>The current weather is <strong>' + ob.weather.toLowerCase() + '</strong> with a temperature of <strong>' + ob.tempC + '°</strong></p>');
                }
                else {
                  $overlay.append('<p>The current weather in <strong>' + place.name +'</strong> is <strong>' + ob.weather.toLowerCase() + '</strong> with a temperature of <strong>' + ob.tempC + '°</strong></p>');
                }

                pointer = new google.maps.LatLng(loc.lat, loc.long);
                map = new google.maps.Map(document.getElementById("map-canvas"), {
                  center    : pointer,
                  zoom      : 15,
                  mapTypeId : google.maps.MapTypeId.ROADMAP, //google.maps.MapTypeId.SATELLITE,
                  disableDefaultUI : true
                });

                // map.setTilt(45);

                $mapCanvas.append($overlay);

                $.ajax({
                  url  : 'http://api.aerisapi.com/forecasts',
                  data : $.extend({}, authKeys, {
                    p : ':auto'
                  }),
                  dataType : 'jsonp'
                }).done(function (aForecastData) {
                  if (aForecastData.success == true) {
                    var today = aForecastData.response[0].periods[0];
                    $overlay.append('<p>Today\'s forecast:</p>');
                    $('<ul>').append(
                      '<li>Temperature - Max <strong>' + today.maxTempC + '°</strong>, Min <strong>' + today.minTempC + '°</strong></li>',
                      '<li>Wind <strong>' + today.windDir + ' at ' + today.windSpeedKPH + 'KPH</strong></li>'
                    ).appendTo($overlay);
                  }
                });
              }
            });
        }
      });

  };
  
  // Public Methods
  this.Show = function($Target) {
    m_$View.empty();
    parent.Show($Target);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (oPos) {
        getWeather(oPos.coords);
      }, function (e) {
        getWeather();
      });
    } else {
      getWeather();
    }
  };
  
  this.Hide = function(){
    m_$View.empty();
    parent.Hide();
  };
}
