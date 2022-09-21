const { formato3, albumMioPrueba } = require("./testData");

// Album del otro es un string todo mocho. 
const androidFiguRegex = /[A-Z]{3}\s\d{2}/g

const getFigusRegex = (stickersString) => [...stickersString.matchAll(androidFiguRegex)].map(e => e[0]);

const getIosStickers = (stickersString) => {

  const list = []
  stickersString.split('\n').forEach(teamString => {
    const teamRegex = teamString.match(/[A-Z]{3}/g);
    const stickersRegex = teamString.match(/\d{1,2}/g);
    if (teamRegex && stickersRegex) {
      list.push({ team: teamRegex[0].toLowerCase(), stickers: stickersRegex.map(number => parseInt(number)) });
    }
  })
  return list;
}

const parseFigusIOS = figus => {

  let missingStickers = [];
  let repeatedStickers = [];

  // Si tiene los dos... missing viene antes. Si está repeated, en teoría están los dos. 
  const missingIndex = figus.search(/(I\sNEED)|(ME\sFALTAN)/i); 
  const repeatedIndex = figus.search(/(SWAPS)|(REPETIDAS)/i);

  // No dice qué son, debería dar error
  if (missingIndex === -1 && repeatedIndex === -1) {
    return {};
  }

  if (missingIndex !== -1 && repeatedIndex !== -1) {
    // Tiene faltantes y repetidas
    const higherIndex = Math.max(missingIndex, repeatedIndex);

    const firstSlice = figus.slice(0, higherIndex);
    const secondSlice = figus.slice(higherIndex);

    const missingString = missingIndex > repeatedIndex ? secondSlice : firstSlice;
    const repeatedString = missingIndex > repeatedIndex ? firstSlice : secondSlice;

    missingStickers = getIosStickers(missingString);
    repeatedStickers = getIosStickers(repeatedString);

  } else if (missingIndex !== -1 && repeatedIndex === -1) {
    // Son las que faltan y no hay repetidas
    missingStickers = getIosStickers(figus);
  } else if (missingIndex === -1 && repeatedIndex !== -1) {
    // Son las repetidas y no hay las que faltan
    repeatedStickers = getIosStickers(figus);
  }

  const parsed = {};

  repeatedStickers.forEach(({ team, stickers }) => {
    const missing = parsed[team]?.missing || []
    parsed[team] = { missing, repeated: stickers }
  })

  missingStickers.forEach(({ team, stickers }) => {
    const repeated = parsed[team]?.repeated || []
    parsed[team] = { missing: stickers, repeated }
  })

  return parsed;
}

const parseFigusAndroid = (figus) => {
  // missing, repeated

  let missingStickers = [];
  let repeatedStickers = [];

  // Si tiene los dos... missing viene antes. Si está repeated, en teoría están los dos. 
  const missingIndex = figus.search(/MISSING/i);
  const repeatedIndex = figus.search(/REPEATED/i);

  // No dice qué son, debería dar error
  if (missingIndex === -1 && repeatedIndex === -1) {
    return {};
  }

  if (missingIndex !== -1 && repeatedIndex !== -1) {
    // Tiene faltantes y repetidas
    const higherIndex = Math.max(missingIndex, repeatedIndex);

    const firstSlice = figus.slice(0, higherIndex);
    const secondSlice = figus.slice(higherIndex);

    const missingString = missingIndex > repeatedIndex ? secondSlice : firstSlice;
    const repeatedString = missingIndex > repeatedIndex ? firstSlice : secondSlice;

    missingStickers = getFigusRegex(missingString);
    repeatedStickers = getFigusRegex(repeatedString);

  } else if (missingIndex !== -1 && repeatedIndex === -1) {
    // Son las que faltan y no hay repetidas
    missingStickers = getFigusRegex(figus);
  } else if (missingIndex === -1 && repeatedIndex !== -1) {
    // Son las repetidas y no hay las que faltan
    repeatedStickers = getFigusRegex(figus);
  }

  const parsed = {};

  repeatedStickers.forEach(sticker => {
    const [team, number] = sticker.toLowerCase().split(' ');
    if (!parsed[team]) {
      parsed[team] = { missing: [], repeated: [] }
    }
    parsed[team].repeated.push(parseInt(number));
  })

  missingStickers.forEach(sticker => {
    const [team, number] = sticker.toLowerCase().split(' ');
    if (!parsed[team]) {
      parsed[team] = { missing: [], repeated: [] }
    }
    parsed[team].missing.push(parseInt(number));
  })

  return parsed;
}

const comparar = (miAlbum, albumDelOtro, platform) => {

  // album del otro que sea { "equipo": { repeated: [01, 02], missing: [03, 04] }}.
  const dar = []
  const recibir = []

  const parsedAlbumDelOtro = platform === 'android' ? parseFigusAndroid(albumDelOtro) : parseFigusIOS(albumDelOtro);

  // Por cada info de mis figus
  miAlbum.forEach(({ team, stickers }) => {

    // Por cada figurita mia
    stickers.forEach(({ number, need, swap }) => {
      // Si está en sus repes y la necesito, agregarla a recibir
      if (parsedAlbumDelOtro[team]?.repeated?.includes(number) && need) {
        recibir.push(`${team.toUpperCase()} ${String(number).padStart(2, '0')}`)
      }

      // Si está en sus necesitadas y la tengo, poner en dar
      if (parsedAlbumDelOtro[team]?.missing?.includes(number) && swap) {
        dar.push(`${team.toUpperCase()} ${String(number).padStart(2, '0')}`)
      }
    })
  })
  
  return { dar, recibir }
};

const formatComparedData = (data) => {
  if (!data && !data.length) return;
  let str = '';
  let prevTeam;
  data.forEach(sticker => {
    const [team] = sticker.split(' ');
    if (prevTeam !== team) {
      prevTeam = team
      str += '\n'
    }
    str += (sticker + ' ')
  })

  return str.trim();
}

module.exports = { comparar, formatComparedData }
