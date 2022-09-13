const formatToCopy = (albumData, category) => {

  let missingString = ''
  let swapString = ''

  albumData.forEach(({ team, stickers }) => {

    const missing = stickers.filter(({ need }) => need);
    const swaps = stickers.filter(({ swap }) => swap);

    if (missing.length) {
      missingString += missing.map(({ number }) => `${team.toUpperCase()} ${String(number).padStart(2, '0')}`).join(', ') + '\n'
    }

    if (swaps.length) {
      swapString += swaps.map(({ number }) => `${team.toUpperCase()} ${String(number).padStart(2, '0')}`).join(', ') + '\n'
    }
  })

  const formattedMissingString = 'MISSING: \n' + missingString
  const formattedSwapString = 'REPEATED:\n' + swapString

  if (category === 'faltantes') {
    return formattedMissingString
  }

  if (category === 'repetidas') {
    return formattedSwapString
  }


  return formattedMissingString + '\n' + formattedSwapString
}

module.exports = { formatToCopy }