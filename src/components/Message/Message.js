import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

const Message = ({ msg, title, variant }) => {
  return (
    <Alert variant={variant ? variant : "warning"}>
      {title ? <Alert.Heading>{title}</Alert.Heading> : null}
      {msg}
    </Alert>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
