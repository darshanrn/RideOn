var autocompletesrc;
var autocompletedest;

function initialize() {
	//add listener for source 
    var inputsrc = document.getElementById('source');
    autocompletesrc = new google.maps.places.Autocomplete(inputsrc);
    google.maps.event.addListener(autocompletesrc, 'place_changed', callbkFuncsrc);

	//add listener for destination
    var inputdest = document.getElementById('destination');
    autocompletedest = new google.maps.places.Autocomplete(inputdest);
    google.maps.event.addListener(autocompletedest, 'place_changed', callbkFuncdest);
  }
  
  function callbkFuncsrc() {
	  //infowindow.close();
	  //marker.setVisible(false);
	  //input.className = '';
	  var place = autocompletesrc.getPlace();
	  if (!place.geometry) {
	    // Inform the user that the place was not found and return.
	    //input.className = 'notfound';
	    return;
	  }
	
	  var address = '';
	  if (place.address_components) {
	    address = [
	      (place.address_components[0] && place.address_components[0].short_name || ''),
	      (place.address_components[1] && place.address_components[1].short_name || ''),
	      (place.address_components[2] && place.address_components[2].short_name || '')
	    ].join(' ');
	  }
	
	  //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	
}

function callbkFuncdest() {
      //infowindow.close();
      //marker.setVisible(false);
      //input.className = '';
      var place = autocompletedest.getPlace();
      if (!place.geometry) {
        // Inform the user that the place was not found and return.
        //input.className = 'notfound';
        return;
      }

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);

}
