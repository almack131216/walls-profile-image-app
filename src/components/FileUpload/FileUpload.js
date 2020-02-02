import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Message from "../Message/Message";
import ImagePreview from "./ImagePreview";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const updateProfileImage = () => {
    console.log("Update profile image in navbar...");
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", file.name);
    // console.log("file?", file);
    // console.log("file name?", file.name);
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

      const { name: filename, link: filePath } = res.data.data;
      setUploadedFile({ filename, filePath });
      // setMessage({ msg: "File Uploaded", variant: "success" });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          setMessage({
            msg: "There was a problem with the server",
            variant: "danger"
          });
        } else {
          setMessage({ msg: err.response.data.msg, variant: "danger" });
        }
      } else {
        setMessage({ msg: "Network Error", variant: "danger" });
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          {message.msg ? (
            <Message msg={message.msg} variant={message.variant} />
          ) : null}

          <ImagePreview
            src={uploadedFile.filePath}
            alt={uploadedFile.filename}
          />

          <Form onSubmit={onSubmit}>
            <input type="file" onChange={onChange} accept="image/*" />
            <input type="submit" />
            {uploadedFile.filename ? (
              <Button onClick={updateProfileImage}>
                Make this my profile picture
              </Button>
            ) : null}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
