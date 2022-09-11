import React, { useState } from 'react';
import { comparar, formatComparedData } from './comparar';
import './Modal.css';

const stopPropagation = (e) => e.stopPropagation();

const ModalComponent = ({ onClose, albumData }) => {

  const [value, setValue] = useState('');

  const [comparedData, setComparedData] = useState(null);

  const handleChange = ({ target }) => setValue(target.value || '')

  const onCompare = () => {
    setComparedData(comparar(albumData, value))
  }

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <div className="modal-header">
          <h2>Cambios</h2>
          <span>Pegá acá la info que te pasen y esto te va a decir cuáles cambiar</span>
        </div>
        <div className="modal-body">
          {!comparedData && <textarea value={value} className="compare" onChange={handleChange} />}
          {comparedData && (
            <>
              <div className='result-container'>
                <h3>PARA DAR: {comparedData[0].length}</h3>
                <textarea name="dar" id="dar" className="result" defaultValue={formatComparedData(comparedData[0])} />
              </div>
              <div className='result-container'>
                <h3>PARA RECIBIR {comparedData[1].length}</h3>
                <textarea name="recibir" id="recibir" className="result" defaultValue={formatComparedData(comparedData[1])} />
              </div>
            </>
          )}
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>CERRAR</button>
          <button onClick={onCompare}>COMPARAR</button>
        </div>
      </div>
    </div>
  )
}

export default ModalComponent