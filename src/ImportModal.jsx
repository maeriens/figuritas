import React, { useState } from 'react';
import { parseDataToImport } from './albumHelpers';
import { parsearAlbum } from './comparar';
import './CompareModal.css';

const stopPropagation = (e) => e.stopPropagation();

const ImportModal = ({ onClose, updateAlbumData }) => {

  const [value, setValue] = useState('');
  const [platform, setPlatform] = useState(null);

  const handleChange = ({ target }) => setValue(target.value || '')

  const onImport = () => {
    const parsedAlbum = parsearAlbum(platform, value);
    const formattedData = parseDataToImport(parsedAlbum)
    updateAlbumData(formattedData)
    onClose()
  }

  const isPlatformSelectScreen = !platform;

  const getModalContent = () => {
    if (isPlatformSelectScreen) {
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
              <p>I need</p>
              <p>FWC: 1, 2, 3</p>
              <p>QAT: 2, 3, 4</p>
              <p>Swaps</p>
              <p>FWC: 4, 5</p>
              <p>QAT: 1</p>
            </div>
          </div>
        </>
      )
    }

    return (
      <div className="result-container">
        <div className='warning-box'>CUIDADO: ESTO VA A REEMPLAZAR TODOS LOS DATOS DE ESTA PÁGINA Y NO PUEDE REVERTIRSE</div>
        <h3>Pegá las figus para importar</h3>
        <textarea id='compare' value={value} className="compare" onChange={handleChange} />
      </div>
    )
  }

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={stopPropagation}>
        <div className="modal-header">
          <h2>IMPORTAR</h2>
        </div>
        <div className="modal-body">
          {getModalContent()}
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>CERRAR</button>
          {!isPlatformSelectScreen && (
            <button className='primary' disabled={!value.length} onClick={onImport}>IMPORTAR</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImportModal;