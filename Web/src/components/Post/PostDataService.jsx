import { callApi } from '../../DataService';

export async function fetchPosts({ route, id }) {
    return callApi({ method: 'POST', route, data: { idKorisnik: id } });
}

export async function fetchPostRatings(id) {
    return callApi({ method: 'POST', route: 'ratings', data: { idKorisnik: id } });
}

export async function addPost(data) {
    return callApi({ method: 'POST', route: 'makepost', data });
}

export async function getComments(data) {
    return callApi({ method: 'POST', route: 'comments', data });
}

export async function addComment(data) {
    return callApi({ method: 'POST', route: 'makecomment', data });
}

export async function ratePost(data) {
    return callApi({ method: 'POST', route: 'rate', data });
}

export async function unratePost(data) {
    return callApi({ method: 'DELETE', route: 'rate', data });
}
