import React, { use } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import * as WorkspaceAPI from "trimble-connect-workspace-api";

function App() {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
