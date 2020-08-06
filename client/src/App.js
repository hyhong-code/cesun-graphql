import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { loadUser } from "./actions/user";
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Profile from "./components/pages/Profile";
import Product from "./components/pages/Product";
import Order from "./components/pages/Order";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import "./App.scss";

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/order/:id" component={Order} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, { loadUser })(App);
