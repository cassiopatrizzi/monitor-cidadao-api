// Mapeamento pt-br para en-US dos tipos do Google Places
const typeMap = {
  restaurante: "restaurant",
  hospital: "hospital",
  escola: "school",
  farmacia: "pharmacy",
  banco: "bank",
  supermercado: "supermarket",
  delegacia: "police",
  parque: "park",
  bar: "bar",
  hotel: "lodging",
  academia: "gym",
  rodoviaria: "bus_station",
  museu: "museum",
  cinema: "movie_theater",
  igreja: "church",
  pizzaria: "pizza_restaurant",
  biblioteca: "book_store",
  postos_combustiveis: "gas_station",
  posto_saude: "health",
  veterinario: "veterinary_care",
  shopping: "shopping_mall",
  padaria: "bakery",
  cafeteria: "cafe",
  estacionamento: "parking",
  correios: "post_office",
  livraria: "book_store",
  floricultura: "florist",
  petshop: "pet_store",
  parque_infantil: "playground",
  centro_comunitario: "community_center",
  centro_esportivo: "sports_complex",
  clinica: "doctor",
  dentista: "dentist",
  universidade: "university",
  aeroporto: "airport"
};

function getTypeInEnglish(type) {
  if (!type) return undefined;
  return typeMap[type.toLowerCase()] || type;
}

module.exports = {
  getTypeInEnglish
};
