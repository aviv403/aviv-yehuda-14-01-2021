import React from "react";
import { CardGroup, Form, Container } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import ForecastCard from "./ForecastCard";

const ForecastCardList = ({ cityData, accKey }) => {
  const cityKey = cityData.Key;
  const { data } = useAxios("5DaysForcast", { cityKey }, accKey);

  return (
    <Container
      className="d-inline justify-content-center text-center"
      style={{ marginTop: "40px", marginBottom: "20px" }}
    >
      <Form inline className="justify-content-center">
        <CardGroup>
          {data &&
            data.DailyForecasts.map((df, idx) => {
              return (
                <React.Fragment key={idx}>
                  <ForecastCard dailyForecast={df} />
                </React.Fragment>
              );
            })}
        </CardGroup>
      </Form>
    </Container>
  );
};

export default React.memo(ForecastCardList);
