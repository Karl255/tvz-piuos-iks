import React, { useContext } from 'react';
import { HorizontalDivider } from '../../components/HorizonalDivider';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMessage, getChat } from '../../services/ChatsDataService';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AuthContext } from '../Auth/Auth';
import { useLocation, useParams } from 'react-router';
import { useForm } from 'react-hook-form';

import './inbox.css';
import { formatDateChat } from './formatDateChat';
import { compareAsc, parseISO } from 'date-fns';

export function Chat() {
    const selfStyle = {
        background: 'var(--primary-color-trans)',
        margin: 0,
        marginLeft: 'auto',
    };

    const location = useLocation();
    const { id: idChat } = useParams();
    const { username } = location.state || {};
    const { id } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { reset, register, handleSubmit } = useForm();

    const {
        data: messages,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ['chat', idChat],
        queryFn: () => getChat(idChat),
    });

    const { mutate } = useMutation({
        mutationFn: addMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat', idChat] });
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            reset();
            refetch();
        },
    });

    function sendMessage(data) {
        mutate({ idChat, idKorisnik: id, content: data.content });
    }

    return (
        <>
            <h2>{username}</h2>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                messages
                    .sort((a, b) => compareAsc(parseISO(a.TimeOfMessage), parseISO(b.TimeOfMessage)))
                    .map((message) => (
                        <div
                            key={message.id}
                            className="section"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                maxWidth: '80%',
                                ...(message.idSender === id && selfStyle),
                            }}
                        >
                            {message.Content}
                            <div style={{ color: 'var(--text-darker)' }}>{formatDateChat(message.TimeOfMessage)}</div>
                        </div>
                    ))
            )}
            <HorizontalDivider margin={'1em'} color={'var(--text-darker)'} style={{ width: '100%' }} />
            <form onSubmit={handleSubmit(sendMessage)}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
                    <input
                        {...register('content', { required: true, minLength: 1 })}
                        type="text"
                        placeholder="Message"
                        style={{ padding: 'var(--button-padding)', width: '100%' }}
                    />
                    <button type="submit" className="greenButton">
                        <SendRoundedIcon />
                    </button>
                </div>
            </form>
        </>
    );
}

Chat.propTypes = {
    username: PropTypes.string,
    idChat: PropTypes.number,
};
