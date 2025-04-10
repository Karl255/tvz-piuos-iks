import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { ObjaveContext } from '../../contexts/ObjaveContext';
import { Post } from '../../components/Post/Post';
import './feed.css';
import { NewPost } from '../../components/NewPost/NewPost';

export function Feed() {
    const { objave } = useContext(ObjaveContext);
    const [posts, setPosts] = useState(objave);
    const [sortKey, setSortKey] = useState('Rating');
    const [filter, setFilter] = useState('objave');

    function sortPosts() {
        setPosts(R.sort(R.descend(R.prop(sortKey)), posts));
    }
    useEffect(() => {
        sortPosts();
    }, [sortKey]);

    async function fetchData(route) {
        try {
            const response = await fetch(`http://localhost:8080/api/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idKorisnik: 5 }),
            });

            const res = await response.json();
            setPosts(res);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchDataAsync = async (route) => {
        await fetchData(route);
        setFilter(route);
    };
    useEffect(() => {
        fetchDataAsync('objave');
    }, []);

    return (
        <>
            <Box className="frontPageBar">
                <NewPost />
                <div>
                    <button
                        onClick={() => fetchDataAsync('objave')}
                        className={filter === 'objave' && 'buttonSelected'}
                    >
                        Public
                    </button>
                    <button
                        onClick={() => fetchDataAsync('objavepratitelja')}
                        className={filter === 'objavepratitelja' && 'buttonSelected'}
                        style={{ marginLeft: '0.5em' }}
                    >
                        Following
                    </button>
                    <div className="divider" />
                    <button onClick={() => setSortKey('Rating')} className={sortKey === 'Rating' && 'buttonSelected'}>
                        Popular
                    </button>
                    <button
                        style={{ marginLeft: '0.5em' }}
                        onClick={() => setSortKey('DateOfPosting')}
                        className={sortKey === 'DateOfPosting' && 'buttonSelected'}
                    >
                        New
                    </button>
                </div>
            </Box>
            <Box className="filterSortBar"></Box>
            {posts.map((objava) => {
                return <Post key={objava.PostID} post={objava} />;
            })}
        </>
    );
}
