import React, { useContext } from "react";
import { Card, Collapse, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { SetActiveKeyContext } from "./Navigation";

const FavoriteCard = ({ favoriteCity, accKey }) => {
  const { cityName, cityKey } = favoriteCity;
  const { celsius, darkMode } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { data } = useAxios("todayForcast", { cityName, cityKey }, accKey);
  const setActiveKey = useContext(SetActiveKeyContext);

  const displayDegrees = (value) => {
    const cels = Math.floor((Number.parseInt(value) - 32) * (5 / 9));
    return celsius ? `${cels} °C` : `${value} °F`;
  };

  const getIconUrl = () => {
    const idxIcon =
      Number.parseInt(data[0].WeatherIcon) < 10
        ? `0${data[0].WeatherIcon}`
        : `${data[0].WeatherIcon}`;

    return `https://developer.accuweather.com/sites/default/files/${idxIcon}-s.png`;
  };

  const handleClick = () => {
    dispatch({ type: "SET_CITY_NAME", cityName });
    setActiveKey("home");
  };

  return (
    <Collapse in={true}>
      <Card
        style={{ height: "240px", width: "180px" }}
        onClick={handleClick}
        className={
          darkMode ? "bg-secondary border-light text-light mt-4" : " mt-4"
        }
      >
        {data && (
          <>
            <Card.Body className="text-center">
              <Card.Title>{cityName}</Card.Title>
              <Dropdown.Divider />
              <Card.Img
                className="text-center"
                style={{ width: "50%", marginTop: "1rem" }}
                src={getIconUrl()}
              />
              <Card.Text className="mt-2">{data[0].WeatherText}</Card.Text>
              <Card.Text>
                {displayDegrees(data[0].Temperature.Imperial.Value)}
              </Card.Text>
            </Card.Body>
          </>
        )}
      </Card>
    </Collapse>
  );
};

export default FavoriteCard;
