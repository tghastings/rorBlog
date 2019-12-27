import React from "react";
import { withRouter, Link } from "react-router-dom";

class CommPost extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <li>
        <Link to={"/post/" + this.props.id}>{this.props.title}</Link>
        <date>{this.props.date}</date>
      </li>
    );
  }
}

export default withRouter(CommPost);
