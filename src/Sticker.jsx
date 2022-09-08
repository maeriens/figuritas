import React from 'react';

const Sticker = ({ number, swap, need, handleStickerClick }) => {
  let className = 'sticker'
  if (swap) {
    className += ' swap'
  } else if (!need) {
    className += ' have'
  }

  return (
    <div
      className={className}
      onClick={() => handleStickerClick(number)}
    >
      {number}
    </div>
  )
}

export default Sticker