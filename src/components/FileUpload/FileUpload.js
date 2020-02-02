import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Message from "../Message/Message";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    console.log("file?", file);
    formData.append("image", file);
    console.log("ENDPOINT:", process.env.REACT_APP_API_ENDPOINT);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}`,
        formData,
        {
          headers: {
            Accept: "image/*",
            Authorization: `Client-ID ${process.env.REACT_APP_API_CLIENT_ID}`
          }
        }
      );

      const { id: fileName, link: filePath } = res.data.data;
      console.log(res);
      setUploadedFile({ fileName, filePath });
      setMessage({ msg: "File Uploaded", variant: "success" });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage({
          msg: "There was a problem with the server",
          variant: "danger"
        });
      } else {
        setMessage({ msg: err.response.data.msg, variant: "danger" });
      }
    }
  };

  return (
    <>
      {message.msg ? (
        <Message msg={message.msg} variant={message.variant} />
      ) : null}

      {uploadedFile.fileName ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img src={uploadedFile.filePath} alt="" style={{ width: "100%" }} />
          </div>
        </div>
      ) : (
        <img
          src="https://d25-a.sdn.cz/d_25/c_img_H_EI/3ZDBZ77.jpeg?fl=res,350,350,1|webp,80"
          width="200px"
          height="200px"
        />
      )}
      <Form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} accept="image/*" />
        <input type="submit" />
      </Form>
      <Message
        msg="Test Message (msg='...')"
        title="Title (title='...')"
        variant="success"
      />
      <Message msg="variant='danger'" variant="danger" />
      <Message msg="variant='warning'" variant="warning" />
      <Message msg="variant='info'" variant="info" />
    </>
  );
};

export default FileUpload;
