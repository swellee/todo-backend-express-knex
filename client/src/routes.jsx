import React, { Suspense } from "react";

import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { TodoList } from "./pages/todo-list";
import { Home } from "./pages/home";
import { model_user, action_user_get } from "./models/model_user";
import { useModel } from "use-reaction";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { getToken } from "./ajax";
import { lazy } from "react";
import {
  router_login,
  router_signup,
  router_todo_detail,
  router_todo_list,
} from "./consts";
const TodoDetail = lazy(() => import("./pages/todo-detail"));

const routes = [
  {
    path: router_login,
    element: <Login />,
  },
  {
    path: router_signup,
    element: <SignUp />,
  },
  {
    path: router_todo_list,
    element: <TodoList />,
    auth: true,
  },
  {
    path: router_todo_detail,
    element: <TodoDetail />,
    auth: true,
  },
  {
    path: "/",
    element: <Home />,
  },
  // {
  //     path: '*',
  //     element: <NotFound />
  // }
];

const RouteGuard = ({ auth, element }) => {
  if (auth) {
    const token = getToken();
    if (token) {
      return element;
    } else {
      return <Navigate to={router_login} />;
    }
  }
  return element;
};
export const Pages = () => {
  // try login with token
  const { doAction } = useModel(model_user);
  useEffect(() => {
    doAction(action_user_get);
  }, []);

  return (
    <div className="pages">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<RouteGuard auth={item.auth} element={item.element} />}
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
