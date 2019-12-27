import React from "react";
import axios from "axios";
import moment from "moment";
import CommPost from "./comps/Post";
import PostYear from "./comps/PostYear";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], years: [] };
  }

  componentDidMount() {
    axios.get(`/api/v1/posts/index`).then(res => {
      const posts = res.data;
      // console.log(posts);
      this.sortPostsByYear(posts);
    });
  }

  fixDate(date) {
    console.log(moment(new Date(date)).format("LL"));
    return moment(new Date(date)).format("LL");
    // return moment(String(date)).format("LL");
  }

  sortPostsByYear(posts) {
    let postYears = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      post.NewDate = new Date(post.created_at);
      post.Year = post.NewDate.getFullYear();
      postYears.push(post.Year);
    }
    postYears = Array.from(new Set(postYears));
    this.setState({ posts: posts, years: postYears });
  }

  render() {
    return (
      <>
        <main id="posts">
          {this.state.years.map(year => (
            <PostYear year={year}>
              {this.state.posts.map(post =>
                post.Year === year ? (
                  <CommPost
                    id={post.id}
                    date={this.fixDate(post.created_at)}
                    title={post.title}
                  />
                ) : null
              )}
            </PostYear>
          ))}
        </main>
      </>
    );
  }
}

export default Posts;
