var app = window.app || {};

app.tracker = {};

app.tracker.loadMap = function(lat, lng) {
  var style = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

  var options = {
    zoom: 2,
    center: { lat: lat, lng: lng },
    styles: style,
  }

  var div = document.querySelector('.map');

  app.map = new google.maps.Map(div, options);
}

app.tracker.updateMap = function(lat, lng) {
  app.latLng = new google.maps.LatLng(app.lat, app.lng);

  app.map.panTo(app.latLng);
}

app.tracker.loadMarkers = function(lat, lng) {
  var ISSLocation = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: app.map
  })

  var infoWindow = new google.maps.InfoWindow();

  google.maps.event.addListener(ISSLocation, 'click', function() {
    infoWindow.setContent('CURRENT ISS LOCATION');
    infoWindow.open(app.map, ISSLocation);
  })
}
