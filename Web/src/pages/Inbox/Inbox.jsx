import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';

const chats = [
    {
        user: 'john_doe',
        lastMessage: 'Will be back around 15:00',
        time: '12:34',
    },
    {
        user: 'robert_brown',
        lastMessage: 'You: Not sure',
        time: '11:02',
    },
    {
        user: 'FirstUser',
        lastMessage: 'Night',
        time: 'Yesterday',
    },
];

export function Inbox() {
    return (
        <>
            {chats.map((chat) => (
                <Link key={chat.user} to="/Chat" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Container className="section">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{chat.user}</div>
                            <div style={{ color: 'var(--text-darker)' }}>{chat.time}</div>
                        </div>
                        <div style={{ marginTop: '0.5em' }}>{chat.lastMessage}</div>
                    </Container>
                </Link>
            ))}
        </>
    );
}
