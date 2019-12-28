import React from "react";
import { Link } from "react-router-dom";

class NoMatch extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { posts: [], years: [] };
  // }

  render() {
    return (
      <>
        <main style={{ textAlign: "center" }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for cannot be found.</p>
        </main>
      </>
    );
  }
}

export default NoMatch;
