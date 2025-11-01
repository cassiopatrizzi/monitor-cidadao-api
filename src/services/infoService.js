const axios = require('axios');
require('dotenv').config();

// Mapeamento pt-br para en-US dos tipos do Google Places
const typeMap = {
  restaurante: "restaurant",
  hospital: "hospital",
  escola: "school",
  farmacia: "pharmacy",
  banco: "bank",
  supermercado: "supermarket",
  policia: "police",
  parque: "park",
  bar: "bar",
  hotel: "lodging",
  academia: "gym",
  rodoviaria: "bus_station",
  museu: "museum",
  cinema: "movie_theater",
  igreja: "church",
};

exports.getAllInfo = async ({ latitude, longitude, type }) => {

  const lat = (typeof latitude === 'number' && !isNaN(latitude)) ? latitude : '';
  const lng = (typeof longitude === 'number' && !isNaN(longitude)) ? longitude : '';

  // Air Quality (OpenWeatherMap)
  const airQualityUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`;
  let airQualityInfo = null;
  try {
    const resp = await axios.get(airQualityUrl);
    airQualityInfo = resp.data;
  } catch (e) {
    console.error('Erro ao buscar qualidade do ar:', e.response ? e.response.data : e.message);
    airQualityInfo = null;
  }

  // Prefeitura local (usando Nominatim para geocodificação reversa)
  let city = null;
  let prefeituraUrl = null;
  if (lat && lng) {
    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pt-BR`;
      const geoResp = await axios.get(nominatimUrl, { headers: { 'User-Agent': 'monitor-cidadao-api/1.0' } });
      city = geoResp.data.address && (geoResp.data.address.city || geoResp.data.address.town || geoResp.data.address.village || geoResp.data.address.municipality);
      if (city) {
        // Monta URL da prefeitura (exemplo para cidades de SP, pode ajustar conforme necessidade)
        const citySlug = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        prefeituraUrl = `https://www.${citySlug}.sp.gov.br`;
      }
    } catch (e) {
      prefeituraUrl = null;
    }
  }

  // Google Places API (New)
  const placesUrl = 'https://places.googleapis.com/v1/places:searchNearby';
  let placesInfo = null;
  let typeEn = type;
  if (type && typeMap[type.toLowerCase()]) {
    typeEn = typeMap[type.toLowerCase()];
  }
  try {
    const includedTypes = typeEn ? [typeEn] : undefined;
    const body = {
      ...(includedTypes && { includedTypes }),
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng
          },
          radius: 5000
        }
      }
    };
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.types'
    };
    const placesResp = await axios.post(placesUrl, body, { headers });
    placesInfo = placesResp.data;
  } catch (e) {
    if (e.response) {
      console.error('Erro ao buscar Google Places:', JSON.stringify(e.response.data, null, 2));
    } else {
      console.error('Erro ao buscar Google Places:', e.message);
    }
    placesInfo = null;
  }

  return {
    airQuality: {
      info: airQualityInfo,
      url: airQualityUrl
    },
    prefeitura: {
      city: city,
      url: prefeituraUrl
    },
    places: {
      info: placesInfo,
      url: `${placesUrl}?location.latitude=${lat}&location.longitude=${lng}${typeEn ? `&includedTypes=${typeEn}` : ''}&key=${process.env.GOOGLE_PLACES_KEY}`
    },
  };
};

