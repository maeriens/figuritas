export const countryNames = {
  index: 'Índice', sta: 'Estadios y Pelota', chp: 'Museo',
  qat: 'Qatar', ecu: 'Ecuador', sen: 'Senegal', ned: 'Holanda',
  eng: 'Inglaterra', irn: 'Irán', usa: 'Estados Unidos', wal: 'Gales',
  arg: 'Argentina', ksa: 'Arabia Saudita', mex: 'México', pol: 'Polonia',
  fra: 'Francia', aus: 'Australia', den: 'Dinamarca', tun: 'Túnez',
  esp: 'España', crc: 'Costa Rica', ger: 'Alemania', jpn: 'Japón',
  bel: 'Bélgica', can: 'Canadá', mar: 'Marruecos', cro: 'Croacia',
  bra: 'Brasil', srb: 'Serbia', sui: 'Suiza', cmr: 'Camerún',
  por: 'Portugal', gha: 'Ghana', uru: 'Uruguay', kor: 'Corea del Sur'
}

const teamNamesOrdered = [
  'qat', 'ecu', 'sen', 'ned',
  'eng', 'irn', 'usa', 'wal',
  'arg', 'ksa', 'mex', 'pol',
  'fra', 'aus', 'den', 'tun',
  'esp', 'crc', 'ger', 'jpn',
  'bel', 'can', 'mar', 'cro',
  'bra', 'srb', 'sui', 'cmr',
  'por', 'gha', 'uru', 'kor']

export const fwcGroups = [
  { team: 'index', start: 0, end: 8 },
  { team: 'sta', start: 8, end: 19 },
  { team: 'chp', start: 19, end: 30 }
];

export const editTeamFwc = (teamToSearch, allStickers, newStickers) => {
  const { start } = fwcGroups.find(e => e.team === teamToSearch);

  allStickers.splice(start, newStickers.length, ...newStickers);
  return allStickers;
}

const generateTeamStickers = (total = 19) => [...new Array(total)].map((_, i) => ({ number: i + 1, need: true, swap: false }));

// FWC has the 00 sticker included
const teamFwc = { team: 'fwc', stickers: [...new Array(30)].map((_, i) => ({ number: i, need: true, swap: false })) };
const teamsData = teamNamesOrdered.map(team => ({ team, stickers: generateTeamStickers() }));

export const emptyAlbumData = [
  teamFwc,
  ...teamsData
];

export const calculateCompletion = (albumData) => {
  let need = 0;
  let swap = 0;
  let total = 0;

  albumData.forEach(({ stickers }) => {
    total += stickers.length;
    need += stickers.filter(sticker => sticker.need).length;
    swap += stickers.filter(sticker => sticker.swap).length;
  });

  const percentage = (100 - ((need * 100) / total)).toFixed(2);

  return { need, total, swap, percentage };
};

export const parseDataToImport = (dataToImport) => {

  const importedAlbumData = [...emptyAlbumData]

  Object.entries(dataToImport).forEach(([team, stickers]) => {

    const { missing, repeated } = stickers;

    const teamIndex = team === 'fwc' ? 0 : teamNamesOrdered.indexOf(team) + 1

    importedAlbumData[teamIndex].stickers = importedAlbumData[teamIndex].stickers.map(({ number }) => {

      if (missing.includes(number)) {
        // Me falta
        return { number, need: true, swap: false }
      } else if (repeated.includes(number)) {
        // La tengo repetida
        return { number, need: false, swap: true }
      } else {
        // La tengo pero no repetida
        return { number, need: false, swap: false }
      }

    })
  })

  return importedAlbumData
}