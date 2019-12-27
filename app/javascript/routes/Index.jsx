import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/post/:id" component={Post} />
      <Route path="/post" component={NewPost} />
    </Switch>
  </Router>
);
