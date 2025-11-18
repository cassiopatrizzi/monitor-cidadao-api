import http from 'k6/http';
import { check, sleep } from 'k6';
import { user } from './fixtures/userFixture.js';

export const options = {
    vus: 10,
    duration: '30s'
};

export default function () {
    const registerResponse = http.post('http://localhost:3000/users/register', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(registerResponse, {
        'Status 201 Usuário cadastrado': (r) => r.status === 201,
        'Status 409 E-mail já cadastrado': (r) => r.status === 409
    });
    
    sleep(1);
}