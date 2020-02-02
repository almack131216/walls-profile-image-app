import React from "react";
import Header from "./components/Header/Header";
import FileUpload from "./components/FileUpload/FileUpload";
import "./tmp.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <FileUpload />
    </div>
  );
}

export default App;
