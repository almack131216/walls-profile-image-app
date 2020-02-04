import React, { Component } from "react";
import Header from "./components/Header/Header";
import FileUpload from "./components/FileUpload/FileUpload";
import "./tmp.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgSrc: localStorage.getItem("imgSrc")
    };
    this.setImgSrc = this.setImgSrc.bind(this);
  }

  // update localStorage
  // then... <Header imgSrc /> can show new state
  setImgSrc = () => {
    this.setState({ imgSrc: localStorage.getItem("imgSrc") });
    console.log("[App] setImgSrc()...", this.state.imgSrc);
  };

  render() {
    return (
      <div className="App">
        <strong>{this.state.img}</strong>
        <Header imgSrc={this.state.imgSrc} />
        <FileUpload setImgSrc={this.setImgSrc.bind(this)} />
      </div>
    );
  }
}

export default App;
