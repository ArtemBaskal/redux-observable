import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Beers from "./components/Beers";

function App(props) {
  console.log(props.name);
  return (
    <div className="App">
      <Beers />
    </div>
  );
}

export default connect(state => state.app)(App);
