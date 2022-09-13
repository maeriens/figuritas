import React, { useState } from 'react';
import './Modal.css';
import './ExportModal.css';
import { formatToCopy } from './clipboardHelper';

const stopPropagation = (e) => e.stopPropagation();

const ExportModal = ({ onClose, albumData }) => {

  const [message, setMessage] = useState('');

  const copyToClipboard = (category) => {
    navigator.clipboard.writeText(formatToCopy(albumData, category));
    if (!category) {
      setMessage('Información copiada!')
    } else {
      setMessage(`Copiaste las ${category}`)
    }
  }

  const copyMissing = () => { copyToClipboard('faltantes') }
  const copySwaps = () => { copyToClipboard('repetidas') }
  const copyAll = () => { copyToClipboard() }

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <div className="modal-header">
          <h2>Exportar</h2>
        </div>
        <div className="modal-body">
          <div className='exports-container'>
            <div className={`alert ${message.length > 0 && 'copied'}`}>{message}</div>
            <div className='box' onClick={copyMissing}>Sólo faltantes</div>
            <div className='box' onClick={copySwaps}>Sólo repetidas</div>
            <div className='box' onClick={copyAll}>Todo</div>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>CERRAR</button>
        </div>
      </div>
    </div>
  )
}


export default ExportModal