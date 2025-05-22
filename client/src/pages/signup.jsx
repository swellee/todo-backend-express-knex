import { useRequest } from "ahooks";
import React from "react";
import { fetchData, setToken } from "../ajax";
import { router_login, router_todo_list } from "../consts";
import "./signup.css";
import { Link } from "react-router";
export const SignUp = () => {
  const { runAsync: submitSignup } = useRequest(
    async (username, password) => {
      const res = await fetchData("/user/signup", {
        method: "POST",
        data: {
          username,
          password,
        },
      });
      if (res?.token) {
        setToken(res.token);
        window.location.href = router_todo_list;
      }
    },
    { manual: true }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    console.log(username, password);
    submitSignup(username, password);
  };
  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <div className="btns">
          <input className="btn" type="submit" value="Sign Up" />
          <p>
            already have an account?{"  "} <Link to={router_login} >login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
