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

exports.deleteReport = async (id) => {
  const idx = reports.findIndex(r => r.id === id);
  if (idx === -1) {
    const err = new Error('Relato não encontrado');
    err.status = 404;
    throw err;
  }
  reports.splice(idx, 1);
  return { message: 'Relato excluído com sucesso.' };
};

exports.getAllReports = async () => {
  return reports;
};
