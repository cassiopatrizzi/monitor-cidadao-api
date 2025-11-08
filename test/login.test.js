
const request = require('supertest');
const { expect } = require('chai');
const postRegister = require('../fixtures/postRegister.json');
const postLogin = require('../fixtures/postLogin.json');

const apiUrl = process.env.API_BASE_URL || require('../src/app');

describe('Login', function () {
    describe('POST /users/login', () => {
        let user;
        beforeEach(async () => {
            user = { ...postRegister, email: 'login' + Date.now() + '@teste.com' };
            const res = await request(apiUrl).post('/users/register').send(user);
            const userId = res.body.id;
            await request(apiUrl).get(`/users/validate/${userId}`);
        });

        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const res = await request(apiUrl)
                .post('/users/login')
                .send({ email: user.email, password: user.password });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('token');
            expect(res.body.token).to.be.a('string');
            expect(res.body.validated).to.be.true;
        });

        it('Deve retornar 403 se o usuário não estiver validado', async () => {
            const unvalidated = { ...postRegister, email: 'naovalidado' + Date.now() + '@teste.com' };
            await request(apiUrl).post('/users/register').send(unvalidated);
            const res = await request(apiUrl)
                .post('/users/login')
                .send({ email: unvalidated.email, password: unvalidated.password });
            expect(res.status).to.equal(403);
            expect(res.body).to.have.property('error');
        });

        it('Deve retornar 401 Credenciais inválidas', async () => {
            const res = await request(apiUrl)
                .post('/users/login')
                .send({ email: 'emailinvalido' + Date.now() + '@teste.com', password: 'senhaErrada' });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
        });
    });
});
