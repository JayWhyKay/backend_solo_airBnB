import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";
// import './ReviewFormMl.css';

function ReviewModal({ spotId, type, reviewId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-review-btn" onClick={() => setShowModal(true)}>
        {type} Review
      </button>
      {showModal && (
        <div className="review__modal__container">
          <Modal onClose={() => setShowModal(false)}>
            <ReviewForm
              onClose={() => setShowModal(false)}
              spotId={spotId}
              type={type}
              reviewId={reviewId}
            />
          </Modal>
        </div>
      )}
    </>
  );
}

export default ReviewModal;
