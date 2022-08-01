import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './SignupFormModal.css'

function SignupFormModal() {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <button className='sign_up__button' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
