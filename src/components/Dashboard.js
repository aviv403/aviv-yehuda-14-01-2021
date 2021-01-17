import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import ForecastCardList from "./ForecastCardList";
import { SetFavoritesContext } from "./App";
import CityProfile from "./CityProfile";

const Dashboard = () => {
  const { cityName, accKey, favoriteCities, darkMode } = useSelector(
    (state) => state
  );
  const isFavorite = favoriteCities.some((fc) => fc.cityName === cityName);
  const setFavorites = useContext(SetFavoritesContext);
  const { data } = useAxios("cityInfo", { cityName }, accKey); //fetching city information data!

  const dispatch = useDispatch();

  const handleClick = () => {
    const cityKey = data[0].Key;
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE_CITY", cityKey });
      setFavorites((favs) => favs.filter((f) => f.cityKey !== cityKey));
    } else {
      dispatch({
        type: "ADD_FAVORITE_CITY",
        favoriteCity: { cityName, cityKey },
      });
      setFavorites((favs) => [...favs, { cityName, cityKey }]);
    }
  };

  return (
    <Container
      className={
        darkMode
          ? "bg-dark border border-light mt-3"
          : "bg-light border border-secondary mt-3"
      }
    >
      <Row className="justify-content-center">
        <Form inline className="d-inline">
          <Col>
            {data && (
              <CityProfile
                cityName={data[0].LocalizedName}
                cityKey={data[0].Key}
                accKey={accKey}
              />
            )}
          </Col>
          <Col>
            <Button
              variant={isFavorite ? "outline-danger" : "outline-success"}
              size="lg"
              className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
              onClick={handleClick}
            >
              <Form.Text size="lg">
                {isFavorite ? "Remove from" : "Add to"} Favorites
              </Form.Text>
            </Button>
          </Col>
        </Form>
      </Row>
      <Row>
        {data && <ForecastCardList cityData={data[0]} accKey={accKey} />}
      </Row>
    </Container>
  );
};

export default React.memo(Dashboard);
