import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.postID = this.props.match.params.id;
    this.deletePost = this.deletePost.bind(this);
    this.state = { post: {}, auth: false };
  }

  unescapeHTML(value) {
    return value
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }

  componentDidMount() {
    axios.get(`/auth/is_signed_in.json`).then(res => {
      //Decide what to do
      // console.log(res.data.signed_in);
      if (res.data.signed_in == true) this.setState({ auth: true });
    });
    axios.get("/api/v1/show/" + this.postID).then(res => {
      const post = res.data;
      if (post.message == "Post not found!") {
        this.props.history.push("/notfound");
      } else {
        this.setState({ post: post });
      }
    });
  }

  fixDate(date) {
    return moment(new Date(date)).format("LL");
  }

  deletePost() {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    // console.log(this.state);
    const url = `/api/v1/destroy/${this.state.post.id}}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/"))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <main id="post">
        <div className="article">
          <h2>{this.state.post.title}</h2>
          <date>{this.fixDate(this.state.post.created_at)}</date>
          <span>{ReactHtmlParser(this.state.post.content)}</span>
          <span className="deleteBtn">
            <Link to={"/"}>Go Back</Link>
            {this.state.auth ? (
              <>
                <span> | </span>
                <Link to={`/${this.postID}/edit`}>Edit Article</Link>
                <span> | </span>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.deletePost}
                >
                  Delete Post
                </button>
              </>
            ) : null}
          </span>
        </div>
      </main>
    );
  }
}

export default Post;
