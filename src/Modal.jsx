import React, { useState } from 'react';
import { comparar, formatComparedData } from './comparar';
import './Modal.css';

const stopPropagation = (e) => e.stopPropagation();

const ModalComponent = ({ onClose, albumData }) => {

  const [value, setValue] = useState('');
  const [platform, setPlatform] = useState(null);
  const [mode, setMode] = useState('write');
  const [comparedData, setComparedData] = useState(null);

  const handleChange = ({ target }) => setValue(target.value || '')

  const onCompare = () => {
    setComparedData(comparar(albumData, value, platform))
    setMode('comparar')
    setValue('')
  }

  const onReset = () => {
    setPlatform(null)
    setMode('write')
    setValue('')
  }

  const isCompareScreen = mode === 'comparar';
  const isPlatformScreen = !platform;

  const getModalContent = () => {
    if (isPlatformScreen) {
      return (
        <>
          <div className='platform-selector' onClick={() => setPlatform('android')}>
            <h2>Android o esta App</h2>
            <p>Se ve como:</p>
            <div className='example'>
              <p>MISSING:</p>
              <p>FWC 01 FWC 02 FWC 03</p>
              <p>QAT 02 QAT 03 QAT 04</p>
              <p>REPEATED:</p>
              <p>FWC 04 FWC 05</p>
              <p>QAT 01</p>
            </div>
          </div>
          <div className='platform-selector' onClick={() => setPlatform('ios')}>
            <h2>iOS</h2>
            <p>Se ve como:</p>
            <div className='example'>
              I need
              FWC: 1, 2, 3
              QAT: 2, 3, 4
              Swaps
              FWC: 4, 5
              QAT: 1
            </div>
          </div>
        </>
      )
    }

    if (!isCompareScreen) {
      return (
        <div className="results-container" style={{ width: '50%' }}>
          <h3>Pegá las figus para comparar</h3>
          <textarea id='compare' value={value} className="compare" onChange={handleChange} />
        </div>
      )
    }

    const { dar, recibir } = comparedData;

    return (
      <>
        <div className='result-container'>
          <h3>PARA DAR: {dar.length}</h3>
          <textarea name="dar" id="dar" className="result" readOnly value={formatComparedData(dar)} />
        </div>
        <div className='result-container'>
          <h3>PARA RECIBIR {recibir.length}</h3>
          <textarea name="recibir" id="recibir" className="result" readOnly value={formatComparedData(recibir)} />
        </div>
      </>
    )
  }

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <div className="modal-header">
          <h2>Cambios</h2>
        </div>
        <div className="modal-body">
          {getModalContent()}
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