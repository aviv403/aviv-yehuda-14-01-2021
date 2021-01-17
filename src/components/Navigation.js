import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Home from "./Home";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import Favorites from "./Favorites";

const HOME_KEY = "home";
const FAVORITES_KEY = "favorites";
export const SetActiveKeyContext = React.createContext();

const Navigation = () => {
  const [activeKey, setActiveKey] = useState(HOME_KEY);
  
  const { darkMode, accKey } = useSelector((state) => state);
  const dispatch = useDispatch();

  const geoLocation = useSelector((state) => state.geoLocation);
  const { data } = useAxios("geoLocation", { geoLocation }, accKey);

  useEffect(() => {
    data &&
      dispatch({
        type: "SET_CITY_NAME",
        cityName: data.LocalizedName,
      });
  }, [data]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "gray" : "white";
  }, [darkMode]);

  return (
    <SetActiveKeyContext.Provider value={setActiveKey}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <div className="bg-dark d-flex">
          <Nav
            className="container bg-dark justify-content-end"
            variant="pills"
          >
            <Nav.Item>
              <Nav.Link eventKey={HOME_KEY}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={FAVORITES_KEY}>Favorites</Nav.Link>
            </Nav.Item>

            <Nav.Item style={{ marginLeft: "5rem", marginTop: "0.3rem" }}>
              <BootstrapSwitchButton
                size="sm"
                onstyle="outline-secondary"
                offstyle="outline-light"
                onlabel="☾"
                offlabel="☼"
                onChange={() => {
                  dispatch({ type: "TOGGLE_DARK_MODE" });
                }}
              />
            </Nav.Item>
          </Nav>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey={HOME_KEY}>
            <Home />
          </Tab.Pane>
          <Tab.Pane eventKey={FAVORITES_KEY}>
            <Favorites />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </SetActiveKeyContext.Provider>
  );
};

export default Navigation;
