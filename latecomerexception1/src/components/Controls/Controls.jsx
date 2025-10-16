import React from "react";
import "./Controls.css";

const Controls = ({ date, setDate, desc, setDesc, onSubmit }) => {
  return (
    <div className="controls-container">
      <div className="control-row">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="control-row">
        <label className="label">Description:</label>
        <textarea
          rows="3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="submit-container">
        <button onClick={onSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Controls;
