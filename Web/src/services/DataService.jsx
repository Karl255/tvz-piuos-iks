export async function callApi(method, route, data) {
    const response = await fetch(`http://localhost:8080/api/${route}`, {
        method: method,
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
