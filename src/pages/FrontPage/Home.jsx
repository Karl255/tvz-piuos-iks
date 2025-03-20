import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { ObjaveContext } from '../../contexts/ObjaveContext';
import { Post } from './Post';
import './FrontPage.css';

export function Home() {
    const { objave } = useContext(ObjaveContext);
    const [posts, setPosts] = useState(objave);
    const [sortKey, setSortKey] = useState('likes');

    function sortPosts() {
        setPosts(R.sort(R.descend(R.prop(sortKey)), objave));
    }
    useEffect(() => {
        sortPosts();
    }, [sortKey]);

    return (
        <>
            <Box className="filterSortBar">
                <span>Sort:</span>
                <button onClick={() => setSortKey('likes')} className={sortKey == 'likes' ? 'buttonSelected' : ''}>
                    Popular
                </button>
                <button
                    onClick={() => setSortKey('datumObjave')}
                    className={sortKey == 'datumObjave' ? 'buttonSelected' : ''}
                >
                    New
                </button>
            </Box>
            {posts.map((objava) => {
                return <Post key={objava.idObjava} post={objava} />;
            })}
        </>
    );
}
