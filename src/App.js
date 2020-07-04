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
      <section className="flexCenter flex-column flex-grow-1">
        <img src="/location.png" alt="X" className="logoImg mb-2" />
        <strong className="mt-2">Kindly Add Your Location First</strong>
        <small className="text-muted ">
          There is no location added right now
        </small>
      </section>
    </div>
  );
};

export default App;
