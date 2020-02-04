import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Message from "../Message/Message";
import ImagePreview from "../ImagePreview/ImagePreview";
import Progress from "../Progress/Progress";
import "./FileUpload.css";
import { ConsoleLog, setDocumentTitle } from "../../assets/Helpers";

/*
 * User Steps
 * [0] init
 * [1] Select file (using pseudo button to trigger [hidden] file input)
 * [2] Upload file (upload to imgur, then update local states and save to localStorage[3])
 * [3] update profile image (save to localStorage)
 */

const FileUpload = props => {
  /* [0] init */
  ConsoleLog("[FileUpload]");
  const [userStep, setUserStep] = useState(0); // useful for tracking
  const fileInput = useRef(null); // need this for hidden input field, triggered by pseudo button
  const [selectedFile, setSelectedFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [message, setMessage] = useState({}); // ui feedback
  const [uploadPercentage, setUploadPercentage] = useState(0); // bootstrap percentage progress bar
  /* (END) [0] init */

  /* [1] Select file */
  /* pseudo button triggers file input */
  const triggerInputFile = () => {
    ConsoleLog(
      "[FileUpload] [1] triggerInputFile() > pseudo button triggers file input"
    );
    fileInput.current.click();
  };
  /* (END) pseudo button */
  /* file input changed */
  const fileChangedHandler = e => {
    setUserStep(1);
    setSelectedFile(e.target.files[0]);
    ConsoleLog(
      "[FileUpload] [1] fileChangedHandler() > generate image before upload"
    );

    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  /* (END) file input changed */
  /* (END) [1] Select file */

  /* [2] Upload file */
  const onSubmit = async e => {
    e.preventDefault();
    setUserStep(2);
    ConsoleLog("[FileUpload] [2] onSubmit() ...");

    let formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", selectedFile.name);
    formData.append("title", selectedFile.name);
    ConsoleLog(
      "[FileUpload] [2] onSubmit() > ENDPOINT: " +
        process.env.REACT_APP_API_ENDPOINT
    );
    ConsoleLog("[FileUpload] [2] onSubmit() > selectedFile: " + selectedFile);
    ConsoleLog("[FileUpload] [2] onSubmit() > formData: " + formData);

    try {
      ConsoleLog("[FileUpload] [2] axios.post() ...");
      setDocumentTitle("Uploading image...");

      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "image/*",
            Authorization: `Client-ID ${process.env.REACT_APP_API_CLIENT_ID}`
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 5000);
          }
        }
      );

      setDocumentTitle("");
      const { link } = res.data.data;
      setImagePreviewUrl(link);
      updateProfileImage(); //save to localStorage... [3]
      // setMessage({ msg: "File Uploaded", variant: "success" });
    } catch (err) {
      ConsoleLog("[FileUpload] [2] axios.post() ... catch err");
      setDocumentTitle("");

      if (err.response) {
        if (err.response.status === 500) {
          ConsoleLog("[FileUpload] [2] axios.post() ... catch err ... 500");
          setMessage({
            msg: "There was a problem with the server. Error 500",
            variant: "danger"
          });
        } else {
          ConsoleLog(
            "[FileUpload] [2] axios.post() ... catch err ... " +
              err.response.data.data.error
          );
          setMessage({ msg: err.response.data.data.error, variant: "danger" });
        }
      } else {
        ConsoleLog(
          "[FileUpload] [2] axios.post() ... catch err ... Network Error"
        );
        setMessage({ msg: "Network Error", variant: "danger" });
      }
    }
  };
  /* (END) [2] Upload file */

  /* [3] update profile image */
  const updateProfileImage = () => {
    setUserStep(3);
    ConsoleLog(
      "[FileUpload] [3] updateProfileImage() > SAVE to localStorage: " +
        imagePreviewUrl
    );
    localStorage.setItem("imgSrc", imagePreviewUrl);
    props.setImgSrc();
  };
  /* (END) [3] update profile image */

  /* btns */
  const btnSelectPhoto = type => (
    <Button
      onClick={() => {
        triggerInputFile();
      }}
    >
      {type === "replace" ? "Replace photo" : "Select a photo"}
    </Button>
  );

  const btnUploadPhoto = (
    <Button onClick={onSubmit}>Make this my profile picture</Button>
  );
  /* (END) btns */

  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="file-input-wrap col-sm-8 col-md-6 m-auto">
          {message.msg ? (
            <Message msg={message.msg} variant={message.variant} />
          ) : null}

          {uploadPercentage ? <Progress percentage={uploadPercentage} /> : null}

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
              {imagePreviewUrl
                ? userStep === 3
                  ? btnSelectPhoto("replace")
                  : btnUploadPhoto
                : btnSelectPhoto("select")}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
