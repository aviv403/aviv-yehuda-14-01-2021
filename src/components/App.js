import React, { useEffect } from "react";
import Navigation from "./Navigation";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import useGeoNavigator from "../hooks/useGeoNavigator";

export const SetFavoritesContext = React.createContext();

const App = () => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const geoLocation = useGeoNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    geoLocation && dispatch({ type: "SET_GEO_LOCATION", geoLocation });
  }, [geoLocation]);

  useEffect(() => {
    favorites.map((f) =>
      dispatch({ type: "ADD_FAVORITE_CITY", favoriteCity: f })
    );
  }, []);

  return (
    <SetFavoritesContext.Provider value={setFavorites}>
      <Navigation />
    </SetFavoritesContext.Provider>
  );
};

export default App;
