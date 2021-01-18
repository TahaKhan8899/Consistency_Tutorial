import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Welcome from "components/Welcome";
import MyHabits from "components/MyHabits";
import Register from "components/User/Register";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Welcome} exact={true} />
      <Route path="/habits" component={MyHabits} exact={true} />
      <Route path="/register" component={Register} exact={true} />
    </BrowserRouter>
  );
}

export default App;
