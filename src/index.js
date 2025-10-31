const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const infoRoutes = require('./routes/infoRoutes');

const app = express();
app.use(express.json());

// Rotas principais
app.use('/users', userRoutes);
app.use('/reports', reportRoutes);
app.use('/info', infoRoutes);

// Swagger
const swaggerFile = path.join(__dirname, '../resources/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
