exports.deleteProfile = async (req, res) => {
  try {
    await userService.deleteProfile(req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};
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
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 401).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const filteredUser = {
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state
    };
    res.json(filteredUser);
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
