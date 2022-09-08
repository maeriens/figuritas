import React from 'react';
import './Modal.css';

const stopPropagation = (e) => e.stopPropagation();

const ModalComponent = ({ onClose }) => {
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <br />
        Aca ponele que se comparan las figus
        <br />
        <div className='modal-footer'>
          <button onClick={onClose}>CERRAR</button>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent