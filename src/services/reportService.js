const { v4: uuidv4 } = require('uuid');
const reports = [];

exports.createReport = async (data) => {
  const { userId, type, description, location } = data;
  if (!type || !description) {
    throw new Error('Dados obrigatórios ausentes');
  }
  const report = {
    id: uuidv4(),
    userId,
    type,
    description,
    location,
    createdAt: new Date()
  };
  reports.push(report);
  return report;
};

exports.getAllReports = async () => {
  return reports;
};
