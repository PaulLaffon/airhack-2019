import React, { Component } from "react";
import "../styles/App.css";
import "../styles/trains.css";
import "../styles/trains-base-style.css";
import "../styles/react-datepicker.css";
import "../bootstrap/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import SiteHeader from "./SiteHeader";
import WelcomerView from "./WelcomerView";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faWalking } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft);
library.add(faInfoCircle);
library.add(faCalendarDay);
library.add(faClock);
library.add(faMinusCircle);
library.add(faArrowCircleRight);
library.add(faWalking);
library.add(faDoorOpen);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <SiteHeader />
          <Switch>
            <Route path="/welcomer" component={WelcomerView} />
            <Route path="/" component={() => <Redirect to="/welcomer/0" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
