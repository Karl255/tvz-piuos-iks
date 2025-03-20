import React from 'react';
import { korisnik } from '../../data/korisnik.json';
import { Container } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import './Profile.css';

export function Profile() {
    const user = korisnik[0];
    return (
        <Container className="section profile">
            <span>
                <h2>
                    {user.username} <EditIcon sx={{ cursor: 'pointer' }} />
                </h2>
            </span>
            <span
                style={{
                    backgroundColor: 'var(--black-darker)',
                    color: 'var(--primary-color)',
                    borderRadius: 'var(--border-radius)',
                    fontWeight: 'bold',
                    padding: 'var(--button-padding)',
                    marginRight: '1em',
                }}
            >
                112 followers
            </span>
            <span
                style={{
                    backgroundColor: 'var(--black-darker)',
                    color: 'var(--primary-color)',
                    borderRadius: 'var(--border-radius)',
                    fontWeight: 'bold',
                    padding: 'var(--button-padding)',
                }}
            >
                53 following
            </span>
            <table>
                <tr>
                    <td>First name:</td>
                    <td>{user.ime}</td>
                </tr>
                <tr>
                    <td>Last name:</td>
                    <td>{user.prezime}</td>
                </tr>
                <tr>
                    <td>Date of birth:</td>
                    <td>{user.DatumRod}</td>
                </tr>
            </table>
        </Container>
    );
}
