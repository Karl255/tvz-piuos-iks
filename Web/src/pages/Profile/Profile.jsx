import React from 'react';
import { korisnik } from '../../data/korisnik.json';
import { Container } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import './Profile.css';

export function Profile() {
    const user = korisnik[0];
    return (
        <Container className="section profile">
            <h2>
                {user.username} <EditIcon sx={{ cursor: 'pointer' }} />
            </h2>
            <div className="followersBar">
                <div>112 followers</div>
                <div>53 following</div>
            </div>

            <div className="userInfo">
                <div>First name:</div>
                <div>{user.ime}</div>

                <div>Last name:</div>
                <div>{user.prezime}</div>

                <div>Date of birth:</div>
                <div>{user.DatumRod}</div>
            </div>
        </Container>
    );
}
