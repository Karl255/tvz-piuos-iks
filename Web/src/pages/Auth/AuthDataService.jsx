export async function registerUser(data) {
    const response = await fetch(`http://localhost:8080/api/auth/register`, {
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

export async function loginUser(data) {
    const response = await fetch(`http://localhost:8080/api/auth/login`, {
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
