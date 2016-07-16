var app = {};

app.getUserLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    app.userLat = position.coords.latitude;
    app.userLng = position.coords.longitude;
    // app.userAlt = position.coords.altitude;

    app.getPassTime(app.userLat, app.userLng);
  });
}

app.getISSLocation = function() {
  $.ajax({
    url: 'http://api.open-notify.org/iss-now.json',
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING LOCATION 📍');
      console.log(payload);
    }
  });
}

app.getSpacePeople = function() {
  $.ajax({
    url: 'http://api.open-notify.org/astros.json',
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING SPACE PEEPS 👽👽👽');
      console.log(payload);
    }
  });
}

app.getPassTime = function(lat, lng) {
  $.ajax({
    url: 'http://api.open-notify.org/iss-pass.json',
    type: 'GET',
    data: {
      format: 'jsonp',
      lat: lat,
      lon: lng,
      n: 3,
    },
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING PASS TIMES 🌍🌏🌎🚀');
      payload.response.map(function(passtime) {
        console.log(convertTimestamp(passtime.risetime));
      });
    }
  });
}
function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),
		dd = ('0' + d.getDate()).slice(-2),
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}

$(function() {
  app.getUserLocation();
});
