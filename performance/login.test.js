import http from 'k6/http';
import { check, sleep } from 'k6';
import { registerAndValidateUser } from './helpers/registerHelper.js';
import { user } from './fixtures/userFixture.js';

export const options = {
    // vus: 10,
    // duration: '30s'
    iterations: 10,
    thresholds: {
        http_req_duration: ['p(90)<5000', 'max<3000'],
        http_req_failed: ['rate<0.01']
    },
};

export default function () {
    
    registerAndValidateUser(user);

    const loginPayload = JSON.stringify({
        email: user.email,
        password: user.password
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post('http://localhost:3000/users/login', loginPayload, params);

    check(response, {
        'Status 200': (r) => r.status === 200,
        'Validar que o token é uma string': (r) => typeof(r.json().token) === 'string'
    });

    sleep(1);
}