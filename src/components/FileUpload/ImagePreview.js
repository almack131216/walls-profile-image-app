import React from "react";
import Img from "react-image";
import ImageNotFound from "../../assets/image-placeholder.jpg";

const ImagePreview = props => {
  console.log("[ImagePreview] ...");
  // const imgUrl = "https://via.placeholder.com/640x480";
  const imgUrl = props.src ? props.src : "";
  console.log("[ImagePreview] ...");
  const imgAlt = props.alt ? props.alt : "Select a photo";

  const imgPrimary = <Img src={[imgUrl, ImageNotFound]} alt={imgAlt} />;

  return <div className="img-peview-wrap">{imgPrimary}</div>;
};

export default ImagePreview;
