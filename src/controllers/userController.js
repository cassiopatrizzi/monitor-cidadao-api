// Atualização parcial do perfil do usuário (PATCH)
exports.patchProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};
exports.validateUser = async (req, res) => {
  try {
    await userService.validateUser(req.params.token);
    res.send('E-mail validado com sucesso!');
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({
      ...user,
      message: 'Usuário cadastrado. E-mail de validação enviado.'
    });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(err.status || 401).json({ error: err.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(err.status || 401).json({ error: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};
