import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

class WelcomerItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.task;
    let time = data.start + " - " + data.end;

    return (
      <div
        className="next-departure-result-page__item"
        style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 text-md-center text-left font-weight-bold">
              {time}
            </div>
            <div className="col-md-5 text-center">
              {data.activite.toUpperCase()}

              {data.activite == "Marche" && (
                <div className="d-none d-md-block" style={{ float: "left", marginLeft:"10px" }}>
                  <FontAwesomeIcon icon="walking" size="2x" color="#339af0" />
                </div>
              )}
              {data.activite == "Welcome" && (
                <div className="d-none d-md-block" style={{ float: "left" }}>
                  <FontAwesomeIcon icon="door-open" size="2x" color="#339af0" />
                </div>
              )}
              {data.activite == "Marche" && (
                <div
                  className="d-block d-md-none"
                  style={{
                    float: "right",
                    position: "absolute",
                    right: "1.5em",
                    top: "0"
                  }}
                >
                  <FontAwesomeIcon icon="walking" size="4x" color="#339af0" />
                </div>
              )}
              {data.activite == "Welcome" && (
                <div
                  className="d-block d-md-none"
                  style={{
                    float: "right",
                    position: "absolute",
                    right: "1em",
                    top: "0"
                  }}
                >
                  <FontAwesomeIcon icon="door-open" size="4x" color="#339af0" />
                </div>
              )}
            </div>
            <div
              className="d-none d-md-block col-md-2 text-center"
              style={{ overflow: "hidden" }}
            >
              {data.lat.toFixed(4)}
            </div>
            <div
              className="d-block d-md-none col-sm-12 text-left font-italic"
              style={{ overflow: "hidden", fontSize: "0.9em" }}
            >
              <span className="font-weight-bold">Latitude :</span>{" "}
              {data.lat.toFixed(4)}
            </div>
            <div
              className="d-none d-md-block col-md-2 text-center"
              style={{ overflow: "hidden" }}
            >
              {data.lng.toFixed(4)}
            </div>
            <div
              className="d-block d-md-none col-sm-12 text-left font-italic"
              style={{ overflow: "hidden", fontSize: "0.9em" }}
            >
              <span className="font-weight-bold">Longitude :</span>{" "}
              {data.lng.toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomerItem;
