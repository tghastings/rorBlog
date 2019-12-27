import React from "react";

class PostYear extends React.Component {
  render() {
    return (
      <div className="listing-container">
        <h2>{this.props.year}</h2>
        <ul>{this.props.children}</ul>
      </div>
    );
  }
}

export default PostYear;
