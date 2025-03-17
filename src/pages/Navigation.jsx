import React from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { Feed } from './FrontPage/Feed';
import { Messages } from './Messaging/Messages';
import { Profile } from './Profile';

export function Navigation() {
    const navigate = useNavigate();
    const [page, setPage] = useState('/');

    const setRoute = (event, newValue) => {
        setPage(newValue);
    };

    useEffect(() => {
        navigate(page);
    }, [page]);

    return (
        <Container maxWidth="md">
            <Tabs value={page} onChange={setRoute} sx={{ borderBottom: '3px solid var(--primary-color)' }}>
                <Tab value="/" label="Home" className="Tab" />
                <Tab value="/messages" label="Messages" className="Tab" />
                <Tab value="/profile" label="Profile" className="Tab" />
            </Tabs>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Container>
    );
}
