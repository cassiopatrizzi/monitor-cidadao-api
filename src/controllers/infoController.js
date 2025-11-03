const infoService = require('../services/infoService');

exports.getAllInfo = async (req, res) => {
  try {
    let { localization, type } = req.query;
    if (!localization) {
      return res.status(400).json({ error: 'Parâmetro obrigatório ausente: forneça a localização (latitude,longitude).' });
    }
    let latitude, longitude;
    if (localization) {
      const parts = localization.split(',');
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        latitude = parseFloat(parts[0]);
        longitude = parseFloat(parts[1]);
      } else {
        return res.status(400).json({ error: 'A localização deve estar no formato latitude, longitude e ambos devem ser números.' });
      }
    }
    const data = await infoService.getAllInfo({ latitude, longitude, type });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
