import React from "react";
import Img from "react-image";
import ImageNotFound from "../../assets/image-placeholder.jpg";
import "./ImagePreview.css";

const ImagePreview = props => {
  const imgUrl = props.src ? props.src : "";
  const imgAlt = props.alt ? props.alt : "";

  // <Img /> tag accepts src array, using ImageNotFound as a fallback / default
  const imgPrimary = <Img src={[imgUrl, ImageNotFound]} alt={imgAlt} />;

  return (
    <div className="img-peview-wrap">
      <div>{imgPrimary}</div>
    </div>
  );
};

export default ImagePreview;
