var app = window.app || {};

app.api = {};
app.api.ISSLocation = 'http://api.open-notify.org/iss-now.json';
app.api.ISSPasstimes = 'http://api.open-notify.org/iss-pass.json';
app.api.spacePeople = 'http://api.open-notify.org/astros.json';


app.getISSLocation = function() {
  $.ajax({
    url: app.api.ISSLocation,
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING ISS LOCATION 📍');
      app.lat = payload.iss_position.latitude;
      app.lng = payload.iss_position.longitude;
      app.tracker.loadMap(app.lat, app.lng);
      app.tracker.loadMarkers(app.lat, app.lng);
    }
  });
}

app.updateISSLocation = function() {
  $.ajax({
    url: app.api.ISSLocation,
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('UPDATING ISS LOCATION 📍🔄');
      app.lat = payload.iss_position.latitude;
      app.lng = payload.iss_position.longitude;
      app.tracker.updateMap(app.lat, app.lng);
      app.tracker.loadMarkers(app.lat, app.lng);
    }
  });
}

app.saveISSLocationToDatabase = function() {
  var getLocation = $.ajax({
    url: app.api.ISSLocation,
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      app.lat = payload.iss_position.latitude;
      app.lng = payload.iss_position.longitude;
    }
  });

  $.when(getLocation).done(function(lat, lng) {
    console.info('SAVING ISS LOCATION TO DATABASE 💾');
    var currentLocation = { lat: lat, lng: lng }
    issPath.push(currentLocation);
  });
}

app.getUserLocation = function() {
  console.info('GETTING USER LOCATION 🙋🏻📍');
  navigator.geolocation.getCurrentPosition(function(position) {
    app.userLat = position.coords.latitude;
    app.userLng = position.coords.longitude;
    app.getPassTimes(app.userLat, app.userLng);
  });
}

app.getPassTimes = function(lat, lng) {
  $.ajax({
    url: app.api.ISSPasstimes,
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
      app.displayPassTimes(payload.response);
    }
  });
}

app.displayPassTimes = function(risetimes) {
  var passtimesHTML = risetimes.map(function(risetime) {
    var list = `
      <p>
        ${app.helpers.convertTimestamp(risetime.risetime)} for
        ${app.helpers.convertSecondsToMinutes(risetime.duration)}min
      </p>
    `;
    return list;
  });
  $('.pass-times').html(passtimesHTML);
}

app.getSpacePeople = function() {
  $.ajax({
    url: app.api.spacePeople,
    type: 'GET',
    dataType: 'jsonp',
    success: function(payload) {
      console.info('GETTING SPACE PEEPS 👽👽👽');
      app.displaySpacePeople(payload.people);
    }
  });
}

app.displaySpacePeople = function(people) {
  var spacePeopleHTML = people.map(function(person) {
    var list = `<p>${person.name}</p>`;
    return list;
  });
  $('.space-people').html(spacePeopleHTML);
}

$(function() {
  app.getISSLocation();
  window.setInterval(app.updateISSLocation, 3000);
  app.saveISSLocationToDatabase();
  app.getUserLocation();
  app.getPassTimes();
  app.getSpacePeople();
});
