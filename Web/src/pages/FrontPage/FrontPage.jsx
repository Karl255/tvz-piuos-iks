import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { ObjaveContext } from '../../contexts/ObjaveContext';
import { Post } from '../../components/Post/Post';
import './FrontPage.css';

export function FrontPage() {
    const { objave } = useContext(ObjaveContext);
    const [posts, setPosts] = useState(objave);
    const [sortKey, setSortKey] = useState('PostRating');

    function sortPosts() {
        setPosts(R.sort(R.descend(R.prop(sortKey)), posts));
    }
    useEffect(() => {
        sortPosts();
    }, [sortKey]);

    async function fetchData(route) {
        try {
            let response = await fetch(`http://localhost:8080/api/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idKorisnik: 4 }),
            });

            let res = await response.json();
            setPosts(res);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            await fetchData('objave');
        };
        fetchDataAsync();
    }, []);

    return (
        <>
            <Box className="filterSortBar">
                <button
                    onClick={() => setSortKey('PostRating')}
                    className={sortKey == 'PostRating' && 'buttonSelected'}
                >
                    Popular
                </button>
                <button
                    onClick={() => setSortKey('DateOfPosting')}
                    className={sortKey == 'DateOfPosting' && 'buttonSelected'}
                >
                    New
                </button>
            </Box>
            {posts.map((objava, i) => {
                return <Post key={i} post={objava} />;
            })}
        </>
    );
}
