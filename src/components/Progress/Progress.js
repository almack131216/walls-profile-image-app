import React from "react";
import PropTypes from "prop-types";
import "./Progress.css";

const Progress = ({ percentage }) => {
  return (
    <div className="progress mb-2">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progress;
