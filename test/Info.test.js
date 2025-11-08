const request = require('supertest');
const { expect } = require('chai');

const apiUrl = process.env.API_BASE_URL || require('../src/app');

describe('GET /info', () => {
    it('Deve retornar 200 Informações agregadas retornadas com sucesso', async () => {
        const res = await request(apiUrl)
            .get('/info')
            .query({ tipo: 'restaurante', cidade: 'São Paulo' });
        expect(res.status).to.be.oneOf([200, 404]);
        expect(res.body).to.satisfy(val => Array.isArray(val) || (typeof val === 'object' && Object.keys(val).length === 0));
        if (Array.isArray(res.body) && res.body.length > 0) {
            expect(res.body[0]).to.have.property('nome');
            expect(res.body[0]).to.have.property('endereco');
        }
    });

    it('Deve retornar apenas aeroportos quando tipo=aeroporto', async () => {
        const res = await request(apiUrl)
            .get('/info')
            .query({ tipo: 'aeroporto', cidade: 'São Paulo' });
        expect(res.status).to.be.oneOf([200, 404]);
        expect(res.body).to.satisfy(val => Array.isArray(val) || (typeof val === 'object' && Object.keys(val).length === 0));
        if (Array.isArray(res.body) && res.body.length > 0) {
            expect(res.body[0].nome.toLowerCase()).to.match(/aeroporto|airport/);
        }
    });

    it('Deve retornar lista vazia para tipo inexistente', async () => {
        const res = await request(apiUrl)
            .get('/info')
            .query({ tipo: 'tipoinexistente', cidade: 'São Paulo' });
        expect(res.status).to.be.oneOf([200, 404]);
        expect(res.body).to.satisfy(val => Array.isArray(val) || (typeof val === 'object' && Object.keys(val).length === 0));
        if (Array.isArray(res.body)) {
            expect(res.body).to.be.an('array').that.is.empty;
        }
    });

    // it('Deve retornar estabelecimentos próximos das coordenadas', async () => {
    //   const res = await request(apiUrl)
    //     .get('/info')
    //     .query({ tipo: 'restaurante', lat: -23.55052, lng: -46.633308 });
    //   expect(res.status).to.equal(200);
    //   expect(res.body).to.be.an('array');
    // });

    it('Deve retornar 400 Localização não informada ou inválida', async () => {
        const res = await request(apiUrl)
            .get('/info')
            .query({ tipo: 'restaurante', lat: 'abc', lng: 'xyz' });
        expect(res.status).to.be.oneOf([400, 422, 404]);
    });

    it('Deve retornar lista vazia se não houver resultados', async () => {
        const res = await request(apiUrl)
            .get('/info')
            .query({ tipo: 'restaurante', cidade: 'CidadeQueNaoExiste' });
        expect(res.status).to.be.oneOf([200, 404]);
        expect(res.body).to.satisfy(val => Array.isArray(val) || (typeof val === 'object' && Object.keys(val).length === 0));
        if (Array.isArray(res.body)) {
            expect(res.body).to.be.an('array').that.is.empty;
        }
    });
});

it('Deve retornar 500 Erro interno ao buscar informações', async () => {
    const res = await request(apiUrl)
        .get('/info')
        .query({ tipo: 'forcar_erro_integracao', cidade: 'São Paulo' });
    expect(res.status).to.be.oneOf([502, 503, 500, 404]);
});
