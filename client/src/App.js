import React from "react";

import { Pages } from "./routes";

import "./App.css";
import { useReaction, useProvider } from "use-reaction";

const App = () => {
  useReaction(true);
  const Provider = useProvider();

  return (
    <div className="app">
      <Provider>
        <Pages />
      </Provider>
    </div>
  );
};

export default App;
