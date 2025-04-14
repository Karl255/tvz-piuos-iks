import { callApi } from '../../DataService';

export async function addPost(data) {
    return callApi({ method: 'POST', route: 'makepost', data });
}

export async function getComments(data) {
    return callApi({ method: 'POST', route: 'comments', data });
}

export async function addComment(data) {
    return callApi({ method: 'POST', route: 'makecomment', data });
}
