import React from 'react';
import { Container } from '@mui/material';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router';

import { Home } from '../FrontPage/Home';
import { Inbox } from '../Inbox/Inbox';
import { ProfilePage } from '../Profile/ProfilePage';

import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
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
                    className={'link ' + (page == '/' && 'activePage')}
                >
                    <HomeIcon sx={{ transform: 'scale(0.95))' }} className="icon" /> iks
                </Link>
                <Link
                    onClick={() => setPage('/inbox')}
                    to={{ pathname: '/inbox' }}
                    className={'link ' + (page == '/inbox' && 'activePage')}
                >
                    <ChatIcon sx={{ transform: 'scale(0.9) translateY(3px)' }} className="icon" /> Inbox
                </Link>
                <Link
                    to={{ pathname: '/profile' }}
                    onClick={() => setPage('/profile')}
                    className={'link ' + (page == '/profile' && 'activePage')}
                >
                    <AccountCircleIcon className="icon" />
                    Profile
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Container>
    );
}
