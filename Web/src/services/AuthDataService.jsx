import { callApi } from './DataService';

export async function registerUser(data) {
    return callApi('POST', 'auth/register', data);
}

export async function loginUser(data) {
    return callApi('POST', 'auth/login', data);
}
