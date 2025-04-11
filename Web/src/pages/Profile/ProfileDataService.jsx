export async function getProfile({ route, id }) {
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

export async function follow({ idUser, idFollow }) {
    const response = await fetch(`http://localhost:8080/api/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idKorisnik: idUser, idZapratiti: idFollow }),
    });
    const res = await response.json();
    if (!response.ok) {
        throw new Error(res.message);
    }
    return res;
}
