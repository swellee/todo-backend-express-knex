import React from "react";
import { fetchData, setToken } from "../ajax";
import { router_signup, router_todo_list } from "../consts";
import { useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useModel } from "use-reaction";
import { action_user_set, model_user } from "../models/model_user";
import { Link } from "react-router-dom";
export const Login = () => {
  const { store: user, doAction } = useModel(model_user);
  const navigate = useNavigate();
  const { runAsync: submitLogin } = useRequest(
    async (username, password) => {
      const res = await fetchData("/user/login", {
        method: "POST",
        data: {
          username,
          password,
        },
      });
      if (res?.token) {
        setToken(res.token);
        doAction(action_user_set, res.user);
        navigate(router_todo_list);
      }
    },
    { manual: true }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(username, password);
    submitLogin(username, password);
  };
  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <div className="btns">
          <input className="btn" type="submit" value="Login" />
          <p>
            don't have an account?{"  "} <Link to={router_signup} >signup</Link>
          </p>

        </div>
      </form>
    </div>
  );
};
