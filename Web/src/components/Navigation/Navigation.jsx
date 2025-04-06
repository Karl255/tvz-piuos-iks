import React from 'react';
import { Container } from '@mui/material';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router';

import { Feed } from '../../pages/Feed/Feed';
import { Inbox } from '../../pages/Inbox/Inbox';
import { ProfilePage } from '../../pages/Profile/ProfilePage';

import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './navigation.css';

export function Navigation() {
    const [page, setPage] = useState('/');
    return (
        <Container>
            <nav>
                <Link
                    onClick={() => setPage('/')}
                    to={{ pathname: '/' }}
                    className={'link ' + (page === '/' && 'activePage')}
                >
                    <img src="/logo-white.svg" alt="Iks logo" width="64" height="64" />
                </Link>
                <Link
                    onClick={() => setPage('/inbox')}
                    to={{ pathname: '/inbox' }}
                    className={'link ' + (page === '/inbox' && 'activePage')}
                >
                    <ChatIcon sx={{ transform: 'scale(0.9) translateY(3px)' }} className="icon" /> Inbox
                </Link>
                <Link
                    to={{ pathname: '/profile' }}
                    onClick={() => setPage('/profile')}
                    className={'link ' + (page === '/profile' && 'activePage')}
                >
                    <AccountCircleIcon className="icon" />
                    Profile
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Container>
    );
}
