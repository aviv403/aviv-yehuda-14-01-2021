import React from "react";
import { Col, Container, CardGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";

const Favorites = () => {
  const { favoriteCities, accKey } = useSelector((state) => state);
  const hasError = useSelector((state) => state.hasError); //checks Api errors!

  return (
    <Container className="d-flex justify-content-center text-center">
      {!hasError && (
        <CardGroup>
          {favoriteCities.map((fc) => {
            return (
              <Col key={fc.cityKey}>
                <FavoriteCard favoriteCity={fc} accKey={accKey} />
              </Col>
            );
          })}
        </CardGroup>
      )}
    </Container>
  );
};

export default Favorites;
