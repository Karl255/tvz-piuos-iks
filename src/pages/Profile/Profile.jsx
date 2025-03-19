import React from 'react';
import { korisnik } from '../../data/korisnik.json';
import { Container } from '@mui/material';

export function Profile() {
    const user = korisnik[0];
    return (
        <Container className="section">
            <h2>{user.username}</h2>
        </Container>
    );
}
