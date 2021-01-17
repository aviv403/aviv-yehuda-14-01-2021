import { useState, useEffect } from "react";

const getLocation = () => {
  var promise = new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      reject("Unknown");
    }
  });

  return promise;
};

const useGeoNavigator = () => {
  const [geoLocation, setGeoLocation] = useState(null);

  useEffect(() => {
    getLocation()
      .then(function (location) {
        setGeoLocation(location);
      })
      .catch(function (err) {
        setGeoLocation(null);
      });
  }, []);

  return geoLocation;
};

export default useGeoNavigator;
