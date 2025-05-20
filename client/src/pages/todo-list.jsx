import React from "react";
import { fetchData, getToken } from "../ajax";
import { useRequest } from "ahooks";
import { TodoItem } from "../components/todo-item";
import { Navigate } from "react-router-dom";
import { router_login } from "../consts";
import { useModel } from "use-reaction";
import { model_user } from "../models/model_user";
import { removeToken } from "../ajax";
import { useNavigate } from "react-router-dom";
import "./todo-list.css";
export const TodoList = () => {
  const token = getToken();
  const { store: user, resetModel } = useModel(model_user);
  const { data: todos } = useRequest(
    async () => {
      const res = await fetchData("/todo");
      return res;
    },
    { ready: !!token }
  );

  const navigate = useNavigate();
  const handleLogout = async () => {
    removeToken();
    resetModel();
    navigate(router_login);
  };
  return token ? (
    <div className="todo-list">
      <header>
        <h1>Todo List</h1>
        <div className="user">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main>
        <ul>
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </main>
    </div>
  ) : (
    <Navigate to={router_login} />
  );
};
