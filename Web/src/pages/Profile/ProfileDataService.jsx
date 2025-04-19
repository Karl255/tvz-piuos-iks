import { callApi } from '../../DataService';

export async function getProfile({ route, id }) {
    return callApi({ method: 'POST', route, data: { idKorisnik: id } });
}

export async function follow({ idUser, idFollow }) {
    return callApi({ method: 'POST', route: 'follow', data: { idKorisnik: idUser, idZapratiti: idFollow } });
}

export async function unfollow({ idUser, idFollow }) {
    return callApi({ method: 'DELETE', route: 'follow', data: { idKorisnik: idUser, idZapratiti: idFollow } });
}
