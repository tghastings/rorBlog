import React from "react";
import SimpleMDE from "simplemde";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import TurndownService from "turndown";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.postID = this.props.match.params.id;
    this.state = { post: {}, auth: false, content: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    let simplemde = new SimpleMDE({
      element: document.getElementById("markdown")
    });
    const turndownService = new TurndownService();
    axios.get(`/auth/is_signed_in.json`).then(res => {
      //Decide what to do
      // console.log(res.data.signed_in);
      this.userAuth(res.data);
    });
    axios.get("/api/v1/show/" + this.postID).then(res => {
      const post = res.data;
      if (post.message == "Post not found!") {
        // this.props.history.push("/notfound");
      } else {
        this.setState({ post: post });
        const markdown = turndownService.turndown(post.content);
        simplemde.value(markdown);
      }
    });
    simplemde.codemirror.on("change", event => {
      this.setState({ ["content"]: simplemde.markdown(simplemde.value()) });
    });
  }

  userAuth(userData) {
    if (userData.signed_in == true) {
      // console.log(userData.user.email);
      this.setState({ ["author"]: userData.user.email });
    } else {
      this.props.history.push("/");
    }
  }

  fixDate(date) {
    return moment(new Date(date)).format("LL");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const url = "/api/v1/posts/update/" + this.state.post.id;
    const title = this.state.post.title;
    const content = this.state.content;
    const author  = this.state.post.author;

    console.log(this.state);

    if (title.length == 0 || content.length == 0 || author.length == 0)
      return "error";

    const body = {
      title,
      author,
      content
    };

    console.log(body);

    console.log(body);
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error something happened.");
      })
      .then(response => this.props.history.push(`/${response.slug}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <>
        <h2>Editing Post</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-label-group">
            <input
              id="inputNewPostTitle"
              className="inputTitle form-control"
              required
              autoFocus
              value={this.state.post.title}
              name="title"
              onChange={this.onChange}
            />
          </div>
          <textarea name="content" id="markdown" onChange={this.onChange}>
          </textarea>
          <button
            id="SubmitNewPost"
            className="loginBtn btn btn-lg btn-primary btn-block text-uppercase"
            type="submit"
          >
            Update Article
        </button>
        </form>
      </>
    );
  }
}

export default Post;
