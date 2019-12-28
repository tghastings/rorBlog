import React from "react";
import SimpleMDE from "simplemde";
import axios from "axios";
import $ from "jquery";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      author: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  componentDidMount() {
    axios.get(`/auth/is_signed_in.json`).then(res => {
      //Decide what to do
      // console.log(res.data.signed_in);
      this.userAuth(res.data);
    });

    let simplemde = new SimpleMDE({
      element: document.getElementById("markdown")
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

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const url = "/api/v1/posts/create";
    const { title, content, author } = this.state;
    // console.log(this.state);

    if (title.length == 0 || content.length == 0 || author.length == 0)
      return "error";

    const body = {
      title,
      author,
      content
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
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
      <form onSubmit={this.onSubmit}>
        <h2>New Article</h2>
        <div className="form-label-group">
          <input
            id="inputNewPostTitle"
            className="inputTitle form-control"
            placeholder="Title"
            required
            autoFocus
            name="title"
            onChange={this.onChange}
          />
        </div>
        <textarea input="bob" name="content" id="markdown"></textarea>
        <button
          id="SubmitNewPost"
          className="loginBtn btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
        >
          Post New Article
        </button>
      </form>
    );
  }
}

export default NewPost;
