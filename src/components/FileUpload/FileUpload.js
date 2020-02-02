import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const FileUpload = () => {
  return (
    <>
      <form>
        <img
          src="https://d25-a.sdn.cz/d_25/c_img_H_EI/3ZDBZ77.jpeg?fl=res,350,350,1|webp,80"
          width="200px"
          height="200px"
        />
        <br />
        <input type="file" accept="image/*" />
        <input type="submit" />
      </form>
    </>
  );
};

export default FileUpload;
