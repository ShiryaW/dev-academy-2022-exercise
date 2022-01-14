import logo from "./logo.svg";
import "./App.css";
import React from "react";

/* NOTES TO SELF:
  What kind of questions can we answer?
  1) Is there a correlation between rainfall/pH/temperature on a given farm?
  2) Which farm gets the most rainfall/has the highest pH/highest temperature?
  3) How has the value of X progressed over time on a given farm?
  4) What are the average values of X on each farm?
 */

function App() {
  return (
    <div className="Farm Data Visualizer">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
