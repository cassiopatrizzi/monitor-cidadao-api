const reportService = require('../services/reportService');

exports.createReport = async (req, res) => {
  try {
    const reportData = { ...req.body, userId: req.user.id };
    const report = await reportService.createReport(reportData);
    res.status(201).json({ message: 'Relato criado com sucesso.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllReports = async (_, res) => {
  try {
    const reports = await reportService.getAllReports();
    if (!reports || reports.length === 0) {
      return res.json([]);
    }
    const filteredReports = reports.map(report => ({
      id: report.id,
      type: report.type,
      description: report.description,
      location: report.location,
      createdAt: report.createdAt
    }));
    res.json(filteredReports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reportService.deleteReport(id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};
