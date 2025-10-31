const reportService = require('../services/reportService');

exports.createReport = async (req, res) => {
  try {
    const reportData = { ...req.body, userId: req.user.id };
    const report = await reportService.createReport(reportData);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
