export async function registerUser(data) {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function login(data) {
    try {
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.error(error);
    }
}
