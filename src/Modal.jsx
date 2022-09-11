import React, { useState } from 'react';
import { comparar, formatComparedData } from './comparar';
import './Modal.css';

const stopPropagation = (e) => e.stopPropagation();

const ModalComponent = ({ onClose, albumData }) => {

  const [value, setValue] = useState('');
  const [mode, setMode] = useState('write');
  const [comparedData, setComparedData] = useState(null);

  const handleChange = ({ target }) => setValue(target.value || '')

  const onCompare = () => {
    setComparedData(comparar(albumData, value))
    setMode('comparar')
  }

  const onReset = () => setMode('compare');

  const isCompareScreen = mode === 'comparar';

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <div className="modal-header">
          <h2>Cambios</h2>
        </div>
        <div className="modal-body">
          {!isCompareScreen && (
            <div className="results-container" style={{ width: '50%' }}>
              <h3>Pegá las figus para comparar</h3>
              <textarea value={value} className="compare" onChange={handleChange} />
            </div>
          )}
          {isCompareScreen && (
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
          {!isCompareScreen && <button disabled={!value.length} onClick={onCompare}>COMPARAR</button>}
          {isCompareScreen && <button onClick={onReset}>VOLVER ATRÁS</button>}
        </div>
      </div>
    </div>
  )
}

export default ModalComponent