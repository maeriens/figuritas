const formatToCopy = albumData => {

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

  let finalString = 'MISSING: \n' + missingString + '\nREPEATED:\n' + swapString

  return finalString

}

module.exports = { formatToCopy }