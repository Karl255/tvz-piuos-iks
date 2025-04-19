import { callApi } from '../../DataService';

export async function registerUser(data) {
    return callApi({ method: 'POST', route: 'auth/register', data });
}

export async function loginUser(data) {
    return callApi({ method: 'POST', route: 'auth/login', data });
}
