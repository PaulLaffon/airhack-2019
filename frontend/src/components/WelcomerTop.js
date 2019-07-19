import React, { Component } from "react";
import { withRouter } from "react-router";

class WelcomerTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="container shadow-lg p-3 mb-5 bg-white rounded"
        style={{ marginTop: "5rem" }}
      >
        <div className="row" style={{ marginTop: "1.9rem" }}>
          <div className="col-6 text-center">
            <h4 style={{ margin: "0" }}>Nb de welcomes</h4>
            <div className="asidenoborder">
              <div style={{ fontSize: "5rem" }}>{this.props.nb}</div>
            </div>
          </div>
          <div className="col-6 text-center">
            <h4 style={{ margin: "0" }}> Gains estimés</h4>
            <div className="aside-with-border">
              <div style={{ fontSize: "5rem" }}>{this.props.gains} €</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(WelcomerTop);
