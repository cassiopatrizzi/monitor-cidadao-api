exports.validateUser = async (token) => {
  const user = users.find(u => u.id === token);
  if (!user) {
    throw new Error('Token inválido ou usuário não encontrado');
  }
  user.validated = true;
  return {
    id: user.id,
    name: user.name,
    cpf: user.cpf,
    email: user.email,
    password: user.password,
    address: user.address,
    district: user.district,
    zipcode: user.zipcode,
    city: user.city,
    state: user.state,
    validated: user.validated
  };
};

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const users = [];

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

function sendValidationEmail(email, token) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Valide seu cadastro',
    text: `Clique para validar: http://localhost:3000/users/validate/${token}`
  });
}

exports.register = async (data) => {
  const { name, cpf, email, password, address, district, zipcode, city, state } = data;
  if (!name || !email || !password || (!city && !address)) {
    const err = new Error('Dados obrigatórios ausentes');
    err.status = 400;
    throw err;
  }
  if (users.find(u => u.email === email)) {
    const err = new Error('E-mail já cadastrado');
    err.status = 409;
    throw err;
  }
  const user = {
    id: uuidv4(),
    name,
    cpf,
    email,
    password,
    address,
    district,
    zipcode,
    city,
    state,
    validated: false,
    createdAt: new Date()
  };
  users.push(user);
  await sendValidationEmail(email, user.id);
  return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, password: user.password, address: user.address, district: user.district, zipcode: user.zipcode, city: user.city, state: user.state, validated: user.validated };
};

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'monitorcidadao_secret';

exports.login = async ({ email, password }) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    const err = new Error('Credenciais inválidas');
    err.status = 401;
    throw err;
  }
  if (!user.validated) {
    const err = new Error('E-mail não validado');
    err.status = 403;
    throw err;
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
  return token;
};

exports.getProfile = async (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) {
    const err = new Error('Não autenticado');
    err.status = 401;
    throw err;
  }
  return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, password: user.password, address: user.address, district: user.district, zipcode: user.zipcode, city: user.city, state: user.state, validated: user.validated };
};

exports.updateProfile = async (userId, data) => {
  const user = users.find(u => u.id === userId);
  if (!user) {
    const err = new Error('Não autenticado');
    err.status = 401;
    throw err;
  }
  Object.assign(user, data);
  return { id: user.id, name: user.name, cpf: user.cpf, email: user.email, password: user.password, address: user.address, district: user.district, zipcode: user.zipcode, city: user.city, state: user.state, validated: user.validated };
};
