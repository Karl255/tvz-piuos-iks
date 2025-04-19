import { callApi } from './DataService';

export async function getProfile({ route, id }) {
    return callApi('POST', route, { idKorisnik: id });
}

export async function follow({ idUser, idFollow }) {
    return callApi('POST', 'follow', { idKorisnik: idUser, idZapratiti: idFollow });
}

export async function unfollow({ idUser, idFollow }) {
    return callApi('DELETE', 'follow', { idKorisnik: idUser, idZapratiti: idFollow });
}
