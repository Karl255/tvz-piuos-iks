import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { Link, Route, Routes, useLocation, Navigate } from 'react-router';

import { Feed } from '../../pages/Feed/Feed';
import { Inbox } from '../../pages/Inbox/Inbox';
import { ProfilePage } from '../../pages/Profile/ProfilePage';

import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import './navigation.css';
import { AuthContext } from '../../pages/Auth/Auth';
import { Chat } from '../../pages/Inbox/Chat';
import PropTypes from 'prop-types';
import { USERNAME_DISPLAY } from '../../constants/test-ids';

export function Navigation({ setLoggedIn }) {
    const user = useContext(AuthContext);
    const { pathname } = useLocation();
    return (
        <Container>
            <nav>
                <Link to={{ pathname: '/feed' }} className={'link ' + (pathname.match('/feed') && 'activePage')}>
                    <img src="/logo-white.svg" alt="Iks logo" width="64" height="64" />
                </Link>
                <Link to={{ pathname: '/inbox' }} className={'link ' + (pathname.match('/inbox') && 'activePage')}>
                    <ChatIcon sx={{ transform: 'scale(0.9) translateY(3px)' }} className="icon" /> <p>Inbox</p>
                </Link>
                <Link
                    to={{ pathname: `/profile/${user.id}` }}
                    className={'link ' + (pathname.match(`/profile/${user.id}`) && 'activePage')}
                >
                    <AccountCircleIcon className="icon" />
                    <p data-test-id={USERNAME_DISPLAY}>{user.Username}</p>
                </Link>
                <div onClick={() => setLoggedIn(false)} className="link">
                    <LogoutRoundedIcon /> <p>Log out</p>
                </div>
            </nav>
            <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/" element={<Navigate to="/feed" />} />
            </Routes>
        </Container>
    );
}

Navigation.propTypes = {
    setLoggedIn: PropTypes.func,
};
