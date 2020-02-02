import React from "react";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
        <a className="logo" href="/">
          <span className="logo-text">
            Walls<span>.io</span>
          </span>
        </a>
      </header>
    </div>
  );
}

export default App;
