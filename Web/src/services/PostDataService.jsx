import { callApi } from './DataService';

export async function fetchPosts({ route, id }) {
    return callApi('POST', route, { idKorisnik: id });
}

export async function fetchPostRatings(id) {
    return callApi('POST', 'ratings', { idKorisnik: id });
}

export async function addPost(data) {
    return callApi('POST', 'makepost', data);
}

export async function getComments(data) {
    return callApi('POST', 'comments', data);
}

export async function addComment(data) {
    return callApi('POST', 'makecomment', data);
}

export async function ratePost(data) {
    return callApi('POST', 'rate', data);
}

export async function unratePost(data) {
    return callApi('DELETE', 'rate', data);
}
