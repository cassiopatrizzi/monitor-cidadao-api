const axios = require('axios');
exports.getAllInfo = async ({ latitude, longitude }) => {
  // Exemplo de URLs externas (fictícias)
  const lat = (typeof latitude === 'number' && !isNaN(latitude)) ? latitude : '';
  const lng = (typeof longitude === 'number' && !isNaN(longitude)) ? longitude : '';
    const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=SEU_API_KEY`;
  let airQualityInfo = null;
  try {
    const resp = await axios.get(airQualityUrl);
    airQualityInfo = resp.data;
  } catch (e) {
    airQualityInfo = null;
  }
    const noiseUrl = `https://dados.prefeitura.sp.gov.br/noise?lat=${lat}&lng=${lng}`;
  let noiseInfo = null;
  const lightingUrl = `https://dados.prefeitura.sp.gov.br/lighting?lat=${lat}&lng=${lng}`;
  const potholesUrl = `https://dados.prefeitura.sp.gov.br/potholes?lat=${lat}&lng=${lng}`;
  const trashUrl = `https://dados.prefeitura.sp.gov.br/trash?lat=${lat}&lng=${lng}`;
  const constructionUrl = `https://dados.prefeitura.sp.gov.br/construction?lat=${lat}&lng=${lng}`;
  const floodedAreasUrl = `https://dados.prefeitura.sp.gov.br/flooded-areas?lat=${lat}&lng=${lng}`;
  const publicTransportUrl = `https://api.transitfeeds.com/v1/getStops?lat=${lat}&lng=${lng}&key=SEU_GTFS_KEY`;
  const socialUrl = `https://api.twitter.com/2/tweets/search/recent?query=geocode:${lat},${lng},5km`;

  return {
    airQuality: {
      info: airQualityInfo,
      url: airQualityUrl
    },
    noise: { info: noiseInfo, url: noiseUrl },
    lighting: { info: null, url: lightingUrl },
    potholes: { info: null, url: potholesUrl },
    trash: { info: null, url: trashUrl },
    construction: { info: null, url: constructionUrl },
    floodedAreas: { info: null, url: floodedAreasUrl },
    publicTransport: { info: null, url: publicTransportUrl },
    social: { info: null, url: socialUrl }
  };
};
