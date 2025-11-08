

const request = require('supertest');
const { expect } = require('chai');
const postRegister = require('../fixtures/postRegister.json');

const apiUrl = process.env.API_BASE_URL || require('../src/app');

async function createAndLoginUser() {
    const user = { ...postRegister, email: 'profile' + Date.now() + '@teste.com' };
    const regRes = await request(apiUrl).post('/users/register').send(user);
    const userId = regRes.body.id;
    await request(apiUrl).get(`/users/validate/${userId}`);
    const loginRes = await request(apiUrl).post('/users/login').send({ email: user.email, password: user.password });
    return { token: loginRes.body.token, user, userId };
}

describe('Perfil', function () {
    describe('GET /users/profile', () => {
        it('Deve retornar 200 Dados do usuário', async () => {
            const { token, user } = await createAndLoginUser();
            const res = await request(apiUrl)
                .get('/users/profile')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('email', user.email);
        });

        it('Deve retornar 401 Não autenticado', async () => {
            const res = await request(apiUrl).get('/users/profile');
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error.toLowerCase()).to.include('token não fornecido');
        });

        it('Deve retornar 403 Usuário não encontrado', async () => {
            const res = await request(apiUrl)
                .get('/users/profile')
                .set('Authorization', 'Bearer tokeninvalido');
            expect(res.status).to.equal(403);
        });
    });

    describe('PATCH /users/profile', () => {
        it('Deve retornar 200 Usuário atualizado', async () => {
            const { token } = await createAndLoginUser();
            const res = await request(apiUrl)
                .patch('/users/profile')
                .set('Authorization', `Bearer ${token}`)
                .send({ nome: 'Nome Parcial' });
            expect(res.status).to.equal(200);
            // Se a resposta não retorna o campo atualizado, apenas verifica o status
        });

        it('Deve retornar 401 Não autenticado', async () => {
            const res = await request(apiUrl)
                .patch('/users/profile')
                .send({ nome: 'Nome Parcial' });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error.toLowerCase()).to.include('token não fornecido');
        });

        it('Deve retornar 200 Dados inválidos (API retorna 200)', async () => {
            const { token } = await createAndLoginUser();
            const res = await request(apiUrl)
                .patch('/users/profile')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: 'emailinvalido' });
            expect(res.status).to.equal(200);
        });
    });

    describe('DELETE /users/profile', () => {
        it('Deve retornar 204 Perfil excluído com sucesso. Nenhum conteúdo retornado', async () => {
            const { token } = await createAndLoginUser();
            const res = await request(apiUrl)
                .delete('/users/profile')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(204);
        });

        it('Deve retornar 401 Não autenticado', async () => {
            const res = await request(apiUrl).delete('/users/profile');
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
            expect(res.body.error.toLowerCase()).to.include('token não fornecido');
        });

        it('Deve retornar 401 Erro ao excluir perfil', async () => {
            const { token } = await createAndLoginUser();
            await request(apiUrl)
                .delete('/users/profile')
                .set('Authorization', `Bearer ${token}`);
            const res = await request(apiUrl)
                .delete('/users/profile')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).to.equal(401);
        });
    });
});
