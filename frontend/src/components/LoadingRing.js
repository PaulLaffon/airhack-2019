import React, { Component } from "react";

class LoadingRing extends Component {
  render() {
    return (
      <div className="text-center">
        <div
          style={{ width: "6rem", height: "6rem", borderWidth: "0.5rem" }}
          className="spinner-border"
          role="status"
        />
        <div style={{ fontSize: "2rem", marginTop: "1.5rem" }}>
          Loading. . .
        </div>
      </div>
    );
  }
}

export default LoadingRing;
