import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class SiteHeader extends Component {
  render() {
    return (
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/" style={{ color: "#41e0fd" }}>
        <img
        style={{maxHeight:"30px", marginRight:"1em"}}
          src={require("../resources/logo.png")}
        />
          AirHack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(SiteHeader);
