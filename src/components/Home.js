import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import SearchForm from "./SearchForm";
import ErrorMsgHandler from "./ErrorMsgHandler";

const Home = () => {
  const hasError = useSelector((state) => state.hasError);

  return (
    <Container className="bg-warnings d-flex justify-content-center">
      <Row
        className="text-center justify-content-center"
        style={{ margin: "20px" }}
      >
            <SearchForm />

        {hasError ? (
          <>
            <ErrorMsgHandler msg={"ERROR: API KEY!"} hasError={true} />
          </>
        ) : (
          <>
            <Dashboard />
          </>
        )}
      </Row>
    </Container>
  );
};

export default React.memo(Home);
