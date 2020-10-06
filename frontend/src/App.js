import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Welcome from "components/Welcome";
import MyHabits from "components/MyHabits";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Welcome} exact={true} />
      <Route path="/habits" component={MyHabits} exact={true} />
    </BrowserRouter>
  );
}

export default App;
