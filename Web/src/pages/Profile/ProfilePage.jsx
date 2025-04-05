import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';

import './profile.css';
import { Post } from '../../components/Post/Post';

export function ProfilePage() {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    async function fetchData(route, setter) {
        try {
            let response = await fetch(`http://localhost:8080/api/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idKorisnik: 5 }),
            });

            let res = await response.json();
            setter(res);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        void fetchData('profile', setUser);
        void fetchData('profileposts', setPosts);
    }, []);

    return (
        <>
            <UserInfo user={user} />
            {posts.map((post, i) => {
                return <Post key={i} post={post} />;
            })}
        </>
    );
}
