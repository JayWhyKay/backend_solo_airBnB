import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageForm from './ImageForm';
import './ImageModal.css';

function ImageModal({ id }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='add-image-btn' onClick={() => setShowModal(true)}>Add Images</button>
            {showModal && (
                <div className='image-form-modal'>
                    <Modal onClose={() => setShowModal(false)}>
                        <ImageForm onClose={() => setShowModal(false)} id={id} />
                    </Modal>
                </div>
            )}
        </>
    );
}

export default ImageModal;
