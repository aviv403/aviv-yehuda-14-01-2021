const initState = {
  accKey: "ozdme2g09GVYvGGprRJxV1UohiPuTbJL",
  cityName: "Tel Aviv",
  favoriteCities: [],
  geoLocation: null,
  celsius: true,
  darkMode: false,
  hasError: false,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CITY_NAME":
      return { ...state, cityName: action.cityName };
    case "UPDATE_SUGGESTIONS":
      return { ...state, suggestions: action.suggestions };
    case "SET_GEO_LOCATION":
      return { ...state, geoLocation: action.geoLocation };
    case "TOGGLE_CELSIUS":
      return { ...state, celsius: !state.celsius };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "HAS_API_ERROR":
      return { ...state, hasError: true };
    case "ADD_FAVORITE_CITY":
      return {
        ...state,
        favoriteCities: [...state.favoriteCities, action.favoriteCity],
      };
    case "REMOVE_FAVORITE_CITY":
      const newFavorites = state.favoriteCities.filter(
        (fc) => fc.cityKey !== action.cityKey
      );
      return { ...state, favoriteCities: newFavorites };
    default:
      return state;
  }
};

export default rootReducer;
