import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewImage } from "../../store/images";

function Images() {
  const dispatch = useDispatch();
  const [url, setUrl] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addReviewImage(url))
  }

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default Images;
