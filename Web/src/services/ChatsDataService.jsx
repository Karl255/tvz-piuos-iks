import { callApi } from './DataService';

export async function addChat({ id1, id2 }) {
    return callApi('POST', 'newchat', { idKorisnik1: id1, idKorisnik2: id2 });
}

export async function getChats(id) {
    return callApi('POST', 'chats', { idKorisnik: id });
}

export async function getChat(id) {
    return callApi('POST', 'chat', { idChat: id });
}

export async function addMessage(data) {
    return callApi('POST', 'sendmessage', data);
}
