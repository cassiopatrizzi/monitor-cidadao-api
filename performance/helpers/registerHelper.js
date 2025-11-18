import http from 'k6/http';

/**
 * @param {Object} user
 * @returns {boolean} 
 */
export function registerAndValidateUser(user) {
    const registerResponse = http.post('http://localhost:3000/users/register', JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
    });
    if (!(registerResponse.status === 201 || registerResponse.status === 409)) {
        return false;
    }
    
    const token = registerResponse.json('validationToken');
    if (token) {
        const validateResponse = http.get(`http://localhost:3000/users/validate/${token}`);
        if (validateResponse.status !== 200) {
            return false;
        }
    } else {
        return false;
    }
    return true;
}
