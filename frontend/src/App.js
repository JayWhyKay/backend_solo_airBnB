import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import Spots from './components/Spots'
import Footer from "./components/Footer";
import MySpotsLanding from "./components/MySpots";
import SpotByID from "./components/SpotByID";
import MyReviews from "./components/MyReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route path="/listings/:spotId">
            <SpotByID />
          </Route>
          <Route exact path="/user/my-listings">
            <MySpotsLanding />
          </Route>
          <Route path="/user/my-reviews">
            <MyReviews />
          </Route>
          <Route>
            Sorry resource not found. Please check url
          </Route>
        </Switch>
      <Footer />
    </>
  );
}

export default App;
