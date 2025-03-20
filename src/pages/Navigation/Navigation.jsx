import React from 'react';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import { Home } from '../FrontPage/Home';
import { Inbox } from '../Inbox/Inbox';
import { Profile } from '../Profile/Profile';

import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './navigation.css';

export function Navigation() {
    const navigate = useNavigate();
    const [page, setPage] = useState('/');

    const colors = ['var(--primary-color)', 'transparent'];

    const setRoute = (newValue) => {
        setPage(newValue);
    };

    useEffect(() => {
        navigate(page);
    }, [page]);

    return (
        <Container maxWidth="md">
            <nav>
                <span onClick={() => setRoute('/')} style={{ borderBottomColor: page == '/' ? colors[0] : colors[1] }}>
                    <HomeIcon sx={{ transform: 'scale(0.95))' }} className="icon" /> iks
                </span>
                <span
                    onClick={() => setRoute('/inbox')}
                    style={{ borderBottomColor: page == '/inbox' ? colors[0] : colors[1] }}
                >
                    <ChatIcon sx={{ transform: 'scale(0.9) translateY(3px)' }} className="icon" /> Inbox
                </span>
                <span
                    onClick={() => setRoute('/profile')}
                    style={{ borderBottomColor: page == '/profile' ? colors[0] : colors[1] }}
                >
                    <AccountCircleIcon className="icon" />
                    Profile
                </span>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Container>
    );
}
