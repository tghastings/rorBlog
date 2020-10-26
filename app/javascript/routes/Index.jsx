import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import EditPost from "../components/EditPost";
import Blank from "../components/Blank";
import NoMatch from "../components/NoMatch";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users/sign_in" component={Blank} />
      <Route path="/post/create" component={NewPost} />
      <Route path="/notfound" exact component={NoMatch} />
      <Route path="/:id" exact component={Post} />
      <Route path="/:id/edit" exact component={EditPost} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);
