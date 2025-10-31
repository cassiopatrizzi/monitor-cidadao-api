// Agrega todas as informações baseadas na localização
exports.getAllInfo = async (req, res) => {
  try {
    let { localization } = req.query;
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
    const data = await infoService.getAllInfo({ latitude, longitude });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const infoService = require('../services/infoService');

exports.getAirQuality = async (req, res) => {
  try {
    const data = await infoService.getAirQuality();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoise = async (req, res) => {
  try {
    const data = await infoService.getNoise();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLighting = async (req, res) => {
  try {
    const data = await infoService.getLighting();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPotholes = async (req, res) => {
  try {
    const data = await infoService.getPotholes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrash = async (req, res) => {
  try {
    const data = await infoService.getTrash();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConstruction = async (req, res) => {
  try {
    const data = await infoService.getConstruction();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFloodedAreas = async (req, res) => {
  try {
    const data = await infoService.getFloodedAreas();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPublicTransport = async (req, res) => {
  try {
    const data = await infoService.getPublicTransport();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSocial = async (req, res) => {
  try {
    const data = await infoService.getSocial();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
