import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/user";

import "./Navbar.scss";

const Navbar = ({ user, logout }) => {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/products">
        Products
      </NavLink>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
      <NavLink exact to="/about">
        About
      </NavLink>
      <NavLink exact to="/contact">
        Contact
      </NavLink>
      {user.isAuthenticated && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { logout })(Navbar);
