import React from "react";
import "./App.scss";
import Header from "./components/Header";

const App = () => {
  return (
    <div
      className="container d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <Header />
    </div>
  );
};

export default App;
