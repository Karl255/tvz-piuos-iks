import React from 'react';
import { HorizontalDivider } from '../../components/HorizonalDivider';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const messages = [
    {
        self: false,
        message: 'Hey!',
        time: '10:59',
    },
    {
        self: false,
        message: 'When is the seminar starting?',
        time: '10:59',
    },
    {
        self: true,
        message: 'Not sure',
        time: '11:02',
    },
];

export function Chat() {
    const selfStyle = {
        background: 'var(--primary-color-trans)',
        margin: 0,
        marginLeft: 'auto',
    };
    return (
        <>
            <h2 style={{ color: 'var(--primary-color)' }}>robert_brown</h2>

            {messages.map((message) => (
                <div
                    key={message.time}
                    className="section"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '80%',
                        ...(message.self && selfStyle),
                    }}
                >
                    {message.message}
                    <div>{message.time}</div>
                </div>
            ))}
            <HorizontalDivider margin={'1em'} color={'var(--text-darker)'} style={{ width: '100%' }} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '1em' }}>
                <input type="text" placeholder="Message" style={{ padding: 'var(--button-padding)', width: '100%' }} />
                <button className="greenButton">
                    <SendRoundedIcon />
                </button>
            </div>
        </>
    );
}
