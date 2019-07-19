import React, { Component } from "react";
import { withRouter } from "react-router";

import LoadingRing from "./LoadingRing";
import WelcomerTop from "./WelcomerTop";
import WelcomerViewData from "./WelcomerViewData";
import WelcomerList from "./WelcomerList";

class WelcomerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomers: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchWelcomers();
  }

  fetchWelcomers = () => {
    this.savedPathName = this.props.location.pathname;

    let args = this.props.location.pathname.trim().split("/");

    this.requestedWelcomer = args[2];
    this.setState({
      welcomers: [],
      loading: true
    });
    fetch("https://13u23growd.execute-api.eu-west-3.amazonaws.com/v1/welcomers/")
      .then(response => response.json())
      .then(welcomersData => {
        if (typeof welcomersData !== "undefined" || welcomersData !== null)
          this.setState({
            welcomers: welcomersData,
            loading: false
          });
      });
  };

  filterWelcomers(welcomers) {
    if (this.requestedWelcomer) {
      let res = [];
      for (let i = 0; i < welcomers.length; i++) {
        if (welcomers[i].assignee_id == this.requestedWelcomer) {
          res.push(welcomers[i]);
        }
      }
      return res;
    } else {
      return welcomers;
    }
  }

  static loadingContent = (
    <div style={{ marginTop: "5rem" }}>
      <LoadingRing />
    </div>
  );

  render() {
    let welcomers = undefined;
    if(!this.state.loading)
    {
      welcomers = this.filterWelcomers(this.state.welcomers);
    }

    let content = this.state.loading ? (
      WelcomerView.loadingContent
    ) : (
      <WelcomerList tasks={welcomers} number={this.requestedWelcomer}/>
    );
    let gains =0;
    let nb= 0;
    if(welcomers)
    {
      gains = welcomers.length * 15;
      let counter = [];
      for (let i = 0; i < this.state.welcomers.length; i++) {
        counter.push(this.state.welcomers[i].assignee_id);
      }
      nb = welcomers.length;
    }

    return (
      <div>
        {!this.state.loading && <WelcomerTop gains={gains} nb={nb} />}
        <div
          className="container-fluid"
          style={{ marginLeft: "3%", marginRight: "3%", width: "unset" }}
        >
          {content}
        </div>
      </div>
    );
  }
}

export default withRouter(WelcomerView);
