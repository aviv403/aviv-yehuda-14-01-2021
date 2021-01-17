import React, { useRef, useState } from "react";
import { Form, Col, Container, Row, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ErrorMsgHandler from "./ErrorMsgHandler";
import { BsSearch } from "react-icons/bs";
import useAxios from "../hooks/useAxios";

const SearchForm = () => {
  const dispatch = useDispatch();
  const {accKey,darkMode} = useSelector((state) => state);
  const [input, setInput] = useState("");
  const hasError = useRef(false);
  const { data } = useAxios(
    "autocomplete",
    { textInput: input },
    accKey
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input) {
      if (
        data &&
        data.some(
          (city) => input.toLowerCase() === city.LocalizedName.toLowerCase()
        )
      ) {
        hasError.current = false;
        dispatch({ type: "SET_CITY_NAME", cityName: input });
      } else {
        hasError.current = true;
      }
    }
    setInput("");
  };

  const handleInputChange = (e) => {
    hasError.current = false;
    let value = e.target.value;
    value = value.replace(/[^A-Za-z-' ']/gi, "");
    console.log(value);
    setInput(value);
  };

  return (
    <Container className="d-flex justify-content-center text-center">
      <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
        <Row>
          <Col>
            <InputGroup>
              <Form.Control
                list="cities"
                autoComplete="off"
                className={
                  darkMode ? "bg-dark text-light" : "bg-light text-dark"
                }
                required
                type="text"
                placeholder="Search City"
                onChange={handleInputChange}
                value={input}
              />

              <InputGroup.Prepend>
                <InputGroup.Text
                  className={
                    darkMode ? "bg-secondary" : "bg-secondary border-secondary"
                  }
                  onClick={handleSubmit}
                >
                  <BsSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <datalist
                id="cities"
                style={{
                  backgroundColor: "red",
                }}
              >
                {data &&
                  data.map((city) => (
                    <option key={city.Key} value={city.LocalizedName} />
                  ))}
              </datalist>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      <ErrorMsgHandler msg="Invalid Input!" hasError={hasError.current} />
    </Container>
  );
};

export default SearchForm;
