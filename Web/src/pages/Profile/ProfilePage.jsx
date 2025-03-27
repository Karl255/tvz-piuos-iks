import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';

import './Profile.css';

export function ProfilePage() {
    const [user, setUser] = useState({});
    async function fetchData() {
        try {
            let response = await fetch('http://localhost:8080/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idKorisnik: 1 }),
            });

            let res = await response.json();
            setUser(res);
            console.log(res);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData();
        };
        fetchDataAsync();
    }, []);

    return (
        <>
            <UserInfo user={user} />
        </>
    );
}
