

const request = require('supertest');
const { expect } = require('chai');
const postRegister = require('../fixtures/postRegister.json');

const apiUrl = process.env.API_BASE_URL || require('../src/app');

describe('Cadastro de Usuário', function () {
  it('Deve cadastrar e retornar 201 Usuário cadastrado (não validado). E-mail de validação enviado', async () => {
    const res = await request(apiUrl)
      .post('/users/register')
      .send(postRegister);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('message');
    expect(res.body.name).to.equal(postRegister.name);
    expect(res.body.email).to.equal(postRegister.email);
    expect(res.body.city).to.equal(postRegister.city);
    expect(res.body.state).to.equal(postRegister.state);
  });

  it('Deve retornar 400 Dados obrigatórios ausentes', async () => {
    const res = await request(apiUrl)
      .post('/users/register')
      .send({ email: 'faltadados@teste.com' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('Deve retornar 409 E-mail já cadastrado', async () => {
    const user = { ...postRegister, email: 'duplicado' + Date.now() + '@teste.com' };

    await request(apiUrl).post('/users/register').send(user);

    const res = await request(apiUrl).post('/users/register').send(user);
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });

  it('Deve validar o e-mail após cadastro', async () => {
    const user = { ...postRegister, email: 'validacao' + Date.now() + '@teste.com' };
    const res = await request(apiUrl).post('/users/register').send(user);
    const userId = res.body.id;
    const validateRes = await request(apiUrl).get(`/users/validate/${userId}`);
    expect(validateRes.status).to.equal(200);
    expect(validateRes.text).to.include('E-mail validado');
  });
});
