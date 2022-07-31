import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import SpotForm from './SpotForm';
import './SpotModal.css'


function SpotModal({spotId, type}) {
  const[showModal, setShowModal] = useState(false);
  return (
    <div>
      <button className="showModal__button" onClick={() => setShowModal(true)}>{type}</button>
      {showModal && (
        <div className="spotModal__form">
          <Modal onClose={()=> setShowModal(false)}>
            <SpotForm onClose={()=> setShowModal(false)} spotId={spotId} type={type} />
          </Modal>
        </div>
      )}
    </div>
  )
}

export default SpotModal
