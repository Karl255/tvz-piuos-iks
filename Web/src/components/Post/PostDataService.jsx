export async function addPost(data) {
    const response = await fetch(`http://localhost:8080/api/makepost`, {
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
