import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const ForecastCard = ({ dailyForecast, cityData }) => {
  const { celsius, darkMode } = useSelector((state) => state);

  const displayDegrees = (value) => {
    const cels = Math.floor((Number.parseInt(value) - 32) * (5 / 9));
    return celsius ? `${cels} °C` : `${value} °F`;
  };

  const getIconUrl = () => {
    const idxIcon =
      Number.parseInt(dailyForecast.Day.Icon) < 10
        ? `0${dailyForecast.Day.Icon}`
        : `${dailyForecast.Day.Icon}`;

    return `https://developer.accuweather.com/sites/default/files/${idxIcon}-s.png`;
  };

  const dayPrefix = () => {
    const day = new Date(dailyForecast.Date);
    const toStr = day.toString();
    return toStr.substr(0, toStr.indexOf(" "));
  };

  return (
    <Card
      style={{ height: "250px", width: "150px" }}
      className={
        darkMode ? "bg-dark border-secondary text-light" : "bg-light text-dark"
      }
    >
      <Card.Header></Card.Header>
      <Card.Body>
        {cityData && <Card.Title>{cityData.LocalizedName}</Card.Title>}
        {dailyForecast && (
          <>
            <Card.Title>{dayPrefix()}</Card.Title>
            <Card.Img
              className="mt-2"
              src={getIconUrl()}
              style={{ width: "50%" }}
            />
            <Card.Text className="mt-3">
              {displayDegrees(dailyForecast.Temperature.Maximum.Value)}
            </Card.Text>
            <Card.Text>
              {displayDegrees(dailyForecast.Temperature.Minimum.Value)}
            </Card.Text>
          </>
        )}
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default React.memo(ForecastCard);
