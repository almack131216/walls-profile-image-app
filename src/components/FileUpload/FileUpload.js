import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Message from "../Message/Message";
import ImagePreview from "../ImagePreview/ImagePreview";
import "./FileUpload.css";
import { ConsoleLog } from "../../assets/Helpers";

const FileUpload = props => {
  const [userStep, setUserStep] = useState(0);
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [message, setMessage] = useState({});

  const triggerInputFile = () => {
    ConsoleLog(
      "[FileUpload] triggerInputFile() > pseudo button triggers file input"
    );
    fileInput.current.click();
  };

  const fileChangedHandler = e => {
    ConsoleLog(
      "[FileUpload] fileChangedHandler() > generate image before upload"
    );
    setUserStep(1);
    setSelectedFile(e.target.files[0]);

    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileImage = () => {
    setUserStep(3);
    ConsoleLog(
      "[FileUpload] updateProfileImage() > SAVE to localStorage: ",
      imagePreviewUrl
    );
    localStorage.setItem("imgSrc", imagePreviewUrl);
    props.setImgSrc();
  };

  const onSubmit = async e => {
    e.preventDefault();
    ConsoleLog("[FileUpload] onSubmit() ...");
    setUserStep(2);

    let formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", selectedFile.name);
    formData.append("title", selectedFile.name);
    ConsoleLog(
      "[FileUpload] onSubmit() > ENDPOINT:",
      process.env.REACT_APP_API_ENDPOINT
    );
    ConsoleLog("[FileUpload] onSubmit() > selectedFile: ", selectedFile);
    ConsoleLog("[FileUpload] onSubmit() > formData: ", formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "image/*",
        Authorization: `Client-ID ${process.env.REACT_APP_API_CLIENT_ID}`
      }
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}`,
        formData,
        config
      );

      const { link } = res.data.data;
      setImagePreviewUrl(link);
      updateProfileImage();
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
      <div className="row mt-5 mb-5">
        <div className="file-input-wrap col-sm-8 col-md-6 m-auto">
          {message.msg ? (
            <Message msg={message.msg} variant={message.variant} />
          ) : null}

          <ImagePreview src={imagePreviewUrl} alt={""} />

          <Form>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={e => fileChangedHandler(e)}
              ref={fileInput}
              accept="image/*"
            />

            <div className="btns mt-2">
              {imagePreviewUrl ? (
                userStep === 3 ? (
                  <Button
                    onClick={() => {
                      triggerInputFile();
                    }}
                  >
                    Replace photo
                  </Button>
                ) : (
                  <Button onClick={onSubmit}>
                    Make this my profile picture
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => {
                    triggerInputFile();
                  }}
                >
                  Select a photo
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
