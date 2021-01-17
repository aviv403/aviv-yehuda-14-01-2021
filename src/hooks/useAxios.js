import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function getUrl(theme, values, accKey) {
  const base = "https://dataservice.accuweather.com/";
  let route = "";
  let query = "";

  switch (theme) {
    case "autocomplete":
      route = "locations/v1/cities/autocomplete";
      query = `?apikey=${accKey}&q=${values.textInput}`;
      break;
    case "todayForcast":
      route = "currentconditions/v1/";
      query = `${values.cityKey}?apikey=${accKey}`;
      break;
    case "5DaysForcast":
      route = "forecasts/v1/daily/5day/";
      query = `${values.cityKey}?apikey=${accKey}`;
      break;
    case "cityInfo":
      route = "locations/v1/cities/search";
      query = `?apikey=${accKey}&q=${values.cityName}`;
      break;
    case "geoLocation":
      if (values.geoLocation) {
        const { latitude, longitude } = values.geoLocation;
        route = "locations/v1/cities/geoposition/search";
        query = `?apikey=${accKey}&q=${latitude},${longitude}`;
      }
      break;
    default:
      return ""
  }
  if (query === "") {
    return "";
  }
  return base + route + query;
}

const useAxios = (theme, values, accKey) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const url = getUrl(theme, values, accKey);

  useEffect(() => {
    let mounted = true;
    if (url) {
      if (mounted) {
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            dispatch({ type: "HAS_API_ERROR" });
          });
      }
    }

    return () => (mounted = false);
  }, [url, values.city]);

  return { data };
};

export default useAxios;
