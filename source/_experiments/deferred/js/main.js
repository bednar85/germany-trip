

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

var deferred = $.Deferred();

function success(position) {
    console.log('success function');

    // resolve the deferred with your object as the data
    deferred.resolve({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    });
}

function error(error) {
    console.warn('ERROR(' + error.code + '): ' + error.message);
}

function fail() {
    console.log('fail function');

    // reject the deferred with an error message
    deferred.reject('failed!');
}

function getLocation() {
    console.log('getLocation function');

    navigator.geolocation.getCurrentPosition(success, fail, options); 

    return deferred.promise(); // return a promise
}

function setDistance() {
    console.log('setDistance');
}

$('#get-current-location-btn').on('click', function() {
    console.log('#get-current-location-btn clicked');

    // then you would use it like this:
    getLocation().then(
    function(location) {
        // success, location is the object you passed to resolve
        console.log('then location: ', location);

        setDistance();
    }, 
    function(errorMessage) {
        // fail, errorMessage is the string you passed to reject
        console.log('then errorMessage: ', errorMessage);
    }); 
});
