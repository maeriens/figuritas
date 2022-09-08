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

const groups = {
  A: ['qat', 'ecu', 'sen', 'ned'],
  B: ['eng', 'irn', 'usa', 'wal'],
  C: ['arg', 'ksa', 'mex', 'pol'],
  D: ['fra', 'aus', 'den', 'tun'],
  E: ['esp', 'crc', 'ger', 'jpn',],
  F: ['bel', 'can', 'mar', 'cro',],
  G: ['bra', 'srb', 'sui', 'cmr'],
  H: ['por', 'gha', 'uru', 'kor']
};

const fwcGroups = [
  { team: 'index', start: 0, end: 8 },
  { team: 'sta', start: 8, end: 19 },
  { team: 'chp', start: 19, end: 29 }
];

const teams = Object.values(groups).map(val => [...val]).flat();

const generateTeamStickers = (total = 19) => [...new Array(total)].map((_, i) => ({ number: i + 1, need: true, swap: false }));

// FWC has the 00 sticker included
const teamFwc = [...new Array(30)].map((_, i) => ({ number: i, need: true, swap: false }));
const fwcData = fwcGroups.map(({ team, start, end }) => ({ team, stickers: teamFwc.slice(start, end) }));
const teamsData = teams.map(team => ({ team, stickers: generateTeamStickers() }));

export const emptyAlbumData = [
  fwcData[0],
  fwcData[1],
  ...teamsData,
  fwcData[2]
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

  const percentage = ((need / total) * 100).toFixed(2);

  return { need, total, swap, percentage };
};