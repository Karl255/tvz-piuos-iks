import { callApi } from '../../DataService';

export async function addPost(data) {
    return callApi({ method: 'POST', route: 'makepost', data });
}

export async function getComments(data) {
    return callApi({ method: 'POST', route: 'comments', data });
}

export async function addComment(data) {
    const response = await fetch(`http://localhost:8080/api/makecomment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
        throw new Error(res.message);
    }
    return res;
}
