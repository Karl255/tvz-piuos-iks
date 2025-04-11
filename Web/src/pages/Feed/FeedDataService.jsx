export async function fetchPosts({ route, id }) {
    const response = await fetch(`http://localhost:8080/api/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idKorisnik: id }),
    });
    const res = await response.json();
    if (!response.ok) {
        throw new Error(res.message);
    }
    return res;
}
