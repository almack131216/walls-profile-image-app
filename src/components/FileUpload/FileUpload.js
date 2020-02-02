import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Message from "../Message/Message";
import ImagePreview from "./ImagePreview";

const FileUpload = () => {
  const fileInput = useRef(null);
  const fileSubmit = useRef(null);
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log("onChange...", e.target.files[0].name);
    // myForm.current.submit();
    onSubmit(e.target.files[0]);
    // fileSubmit.current.click(e);
  };

  const updateProfileImage = () => {
    console.log("Update profile image in navbar...");
  };

  const onSubmit = async e => {
    // e.preventDefault();
    const newFile = file ? file : e;
    const formData = new FormData();
    console.log("file?", e, newFile);
    formData.append("image", newFile);
    formData.append("name", newFile.name);
    // console.log("file?", newFile);
    // console.log("file name?", newFile.name);
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

  const triggerInputFile = () => fileInput.current.click();

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

          <Form>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={e => onChange(e)}
              ref={fileInput}
              accept="image/*"
            />

            {uploadedFile.filename ? (
              <Button onClick={updateProfileImage}>
                Make this my profile picture
              </Button>
            ) : (
              <Button
                onClick={() => {
                  triggerInputFile();
                }}
              >
                Select a photo
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
