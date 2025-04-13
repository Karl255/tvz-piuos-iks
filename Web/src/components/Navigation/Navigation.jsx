import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { Link, Route, Routes, useLocation } from 'react-router';

import { Feed } from '../../pages/Feed/Feed';
import { Inbox } from '../../pages/Inbox/Inbox';
import { ProfilePage } from '../../pages/Profile/ProfilePage';

import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './navigation.css';
import { AuthContext } from '../../pages/Auth/Auth';

export function Navigation() {
    const user = useContext(AuthContext);
    console.log(user);

    const { pathname } = useLocation();

    return (
        <Container>
            <nav>
                <Link to={{ pathname: '/feed' }} className={'link ' + (pathname.match('/feed') && 'activePage')}>
                    <img src="/logo-white.svg" alt="Iks logo" width="64" height="64" />
                </Link>
                <Link to={{ pathname: '/inbox' }} className={'link ' + (pathname.match('/inbox') && 'activePage')}>
                    <ChatIcon sx={{ transform: 'scale(0.9) translateY(3px)' }} className="icon" /> Inbox
                </Link>
                <Link
                    to={{ pathname: `/profile/${user.id}` }}
                    className={'link ' + (pathname.match(`/profile/${user.id}`) && 'activePage')}
                >
                    <AccountCircleIcon className="icon" />
                    {user.Username}
                </Link>
            </nav>
            <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
            </Routes>
        </Container>
    );
}
