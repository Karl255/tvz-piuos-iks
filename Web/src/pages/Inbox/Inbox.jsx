import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router';
import { getChats } from '../../services/ChatsDataService';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { AuthContext } from '../Auth/Auth';

import './inbox.css';
import { formatDateChat } from './formatDateChat';

export function Inbox() {
    const { id, Username } = useContext(AuthContext).user;
    const { data: chats, isPending } = useQuery({
        queryKey: ['chats', id],
        queryFn: () => getChats(id),
    });
    return (
        <>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                chats
                    .filter((chat) => chat.Content)
                    .map((chat) => {
                        const username = chat.username1 === Username ? chat.username2 : chat.username1;
                        const userId = chat.idUser1 === id ? chat.idUser2 : chat.idUser1;
                        return (
                            <Link
                                key={chat.user}
                                to={{ pathname: `chat/${chat.idChat}` }}
                                state={{ username, userId }}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                <Container className="section">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Link to={`/profile/${userId}`} className="postLink">
                                            {username}
                                        </Link>
                                        <div style={{ color: 'var(--text-darker)' }}>{formatDateChat(chat.TMS)}</div>
                                    </div>
                                    <div style={{ marginTop: '0.5em' }}>{chat.Content}</div>
                                </Container>
                            </Link>
                        );
                    })
            )}
        </>
    );
}
