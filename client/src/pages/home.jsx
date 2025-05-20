import React from "react";

import { Link } from "react-router-dom";
import { router_login, router_signup } from "../consts";
import { useModel } from "use-reaction";
import { model_user } from "../models/model_user";
import "./home.css";
import { removeToken } from "../ajax";
export const Home = () => {
  const { store: user, resetModel } = useModel(model_user);
  const logout = () => {
    resetModel();
    removeToken();
  };
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to subscript</h1>
      </header>
      {user.username ? (
        <p>
          Currently logined as {user.username}, check your <Link>Todos</Link>
          or
          <button onClick={logout}>Logout</button>
        </p>
      ) : (
        <p>
          have an account? go to
          <Link to={router_login}>Login</Link>
          or
          <Link to={router_signup}>Signup</Link>
        </p>
      )}
    </div>
  );
};
