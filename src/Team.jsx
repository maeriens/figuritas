import React from 'react'
import { countryNames } from './albumHelpers'
import Sticker from './Sticker'

const Team = ({ team, stickers, onStickerClick, mode }) => {
  const handleStickerClick = (number) => {
    const stickerIndex = stickers.findIndex(sticker => sticker.number === number);
    const { need, swap } = stickers[stickerIndex];
    let state = { need, swap };

    // If I need it and tap the sticker
    if (need && !swap) {
      state = { ...state, need: false };
    } else if (!need && !swap) {
      // If I have it but don't have a swap
      state = { ...state, swap: true };
    } else {
      // If I reset it 
      state = { ...state, need: true, swap: false };
    };

    stickers[stickerIndex] = { number, ...state };
    onStickerClick(team, stickers);
  }

  let filteredStickers = stickers;
  if (mode == 1) {
    filteredStickers = stickers.filter(sticker => sticker.need);
  } else if (mode == 2) {
    filteredStickers = stickers.filter(sticker => sticker.swap);
  }

  if (filteredStickers.length === 0) {
    return <></>
  }

  return (
    <div className='team'>
      <div>
        <b>{countryNames[team]}</b>
      </div>
      <div className='sticker-container'>
        {filteredStickers.map(sticker =>
          <Sticker
            {...sticker}
            key={sticker.number}
            handleStickerClick={handleStickerClick}
          />)}
      </div>
    </div>
  )
}

export default Team;