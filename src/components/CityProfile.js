import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";

const CityProfile = ({ cityName, cityKey, accKey }) => {
  const { celsius, darkMode } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { data } = useAxios(
    "todayForcast",
    { cityName, cityKey },
    accKey
  );

  const handleUnitsClick = () => {
    dispatch({ type: "TOGGLE_CELSIUS" });
  };

  const displayDegrees = (value) => {
    const cels = Math.floor((Number.parseInt(value) - 32) * (5 / 9));
    const cf = (
      <>
        <>{cels} °C</>
        <Card.Text className="text-muted" style={{ fontSize: "15px" }}>
          {value + " °F"}
        </Card.Text>
      </>
    );
    const fc = (
      <>
        <>{value} °F</>
        <Card.Text className="text-muted" style={{ fontSize: "15px" }}>
          {cels + "°C"}
        </Card.Text>
      </>
    );

    return celsius ? cf : fc;
  };

  const getIconUrl = () => {
    const idxIcon =
      Number.parseInt(data[0].WeatherIcon) < 10
        ? `0${data[0].WeatherIcon}`
        : `${data[0].WeatherIcon}`;

    return `https://developer.accuweather.com/sites/default/files/${idxIcon}-s.png`;
  };

  return (
    <Card
      className={darkMode ? "bg-dark border-secondary mt-4" : "bg-light mt-4"}
    >
      {data && (
        <>
          <Card.Body>
            <Card.Title
              className={darkMode ? "text-light border-light" : "text-dark"}
            >
              {cityName}
            </Card.Title>
            <Card.Img
              className="text-center"
              style={{ width: "60%" }}
              src={getIconUrl()}
            />
            <Card.Text className={darkMode ? "text-light" : "text-dark"}>
              {data[0].WeatherText}
            </Card.Text>

            <Card.Text>
              <Button
                onClick={handleUnitsClick}
                variant="outline"
                className="text-primary"
              style={{fontSize: "25px", fontWeight: "bold"}}
              >
                {displayDegrees(data[0].Temperature.Imperial.Value)}
              </Button>
            </Card.Text>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default CityProfile;
