import http from 'k6/http';
import { check, sleep } from 'k6';
import { user } from './fixtures/userFixture.js';

export const options = {
    stages: [
        { duration: '5s', target: 20 },
        { duration: '20s', target: 300 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
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