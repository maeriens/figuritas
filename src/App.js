import React, { useState, useEffect } from "react";
import "./App.css";

import { emptyAlbumData, calculateCompletion } from "./albumHelpers";
import Team from "./Team";
import Modal from "./Modal";

function App() {

  const [albumData, setAlbumData] = useState(JSON.parse(localStorage.getItem("albumData")) || emptyAlbumData);
  const [mode, setMode] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal)

  const updateAlbumData = (data) => {
    localStorage.setItem("albumData", JSON.stringify(data));
    setAlbumData(data);
  };

  const { need, total, swap, percentage } = calculateCompletion(albumData);

  const onStickerClick = (team, stickers) => {
    const newAlbumData = [...albumData];
    const foundIndex = newAlbumData.findIndex(data => data.team === team);
    newAlbumData[foundIndex] = { team, stickers };
    updateAlbumData(newAlbumData);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = openModal ? 'hidden' : 'auto';
  }, [openModal])

  return (
    <div className="App">
      <div className="header">
        Tracker Figuritas QATAR 2022
      </div>
      <div className="data-header">
        <div className="album-info">
          <p>Completaste el {percentage}% del álbum</p>
          <p>Tenés {total - need} de {total} figuritas y {swap} repetidas</p>
        </div>
        <div className="action-buttons">
          <button onClick={() => setMode(0)} className={mode === 0 ? 'selected' : null}>Todas</button>
          <button onClick={() => setMode(1)} className={mode === 1 ? 'selected' : null}>Faltantes</button>
          <button onClick={() => setMode(2)} className={mode === 2 ? 'selected' : null}>Repetidas</button>
          <button onClick={toggleModal} >Modal</button>
        </div>
      </div>
      {openModal && <Modal onClose={toggleModal} />}
      <div className="album-container">
        {albumData.map(({ team, stickers }) => (
          <Team
            key={team}
            team={team}
            stickers={stickers}
            onStickerClick={onStickerClick}
            mode={mode} />
        ))}
      </div>
      <div className="footer">2022 - @maeriens - Algunos derechos reservados, la zurda es siempre la de Messi.</div>
    </div>
  );
}

export default App;
