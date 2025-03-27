import React, { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';

import './Profile.css';
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
                body: JSON.stringify({ idKorisnik: 4 }),
            });

            let res = await response.json();
            setter(res);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData('profile', setUser);
            await fetchData('profileposts', setPosts);
        };
        fetchDataAsync();
        console.log(posts);
    }, []);

    return (
        <>
            <UserInfo user={user} />
            {posts.map((post) => {
                return <Post key={post.content} post={post} />;
            })}
        </>
    );
}
