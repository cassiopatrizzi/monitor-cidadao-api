const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');


const obterToken = async (app) => {
    const bodyLogin = {...postLogin};
    const responseLogin = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);
    return responseLogin.body.token;
}

module.exports = { 
    obterToken 
};