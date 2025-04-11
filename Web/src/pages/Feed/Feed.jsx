import React, { useState, useEffect, useContext } from 'react';
import * as R from 'ramda';
import { Box } from '@mui/material';
import { Post } from '../../components/Post/Post';
import './feed.css';
import { NewPost } from '../../components/Post/NewPost';
import { AuthContext } from '../Auth/Auth';
import { useMutation } from '@tanstack/react-query';
import { fetchPosts } from './FeedDataService';
import { LoadingPage } from '../../components/LoadingPage';

export function Feed() {
    const user = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [sortKey, setSortKey] = useState('Rating');
    const [filter, setFilter] = useState('objave');

    const { isPending, mutate } = useMutation({
        mutationFn: fetchPosts,
        onSuccess: (res) => setPosts(res),
    });

    async function fetchData(route) {
        setFilter(route);
        mutate({ route, id: user.id });
    }
    function sortPosts() {
        setPosts(R.sort(R.descend(R.prop(sortKey)), posts));
    }
    useEffect(() => {
        fetchData('objave');
    }, []);
    useEffect(() => {
        sortPosts();
    }, [sortKey]);

    return (
        <>
            {isPending ? (
                <LoadingPage />
            ) : (
                <>
                    <Box className="frontPageBar">
                        <NewPost />
                        <div>
                            <button
                                onClick={() => fetchData('objave')}
                                className={filter === 'objave' && 'buttonSelected'}
                            >
                                Public
                            </button>
                            <button
                                onClick={() => fetchData('objavepratitelja')}
                                className={filter === 'objavepratitelja' && 'buttonSelected'}
                                style={{ marginLeft: '0.5em' }}
                            >
                                Following
                            </button>
                            <div className="divider" />
                            <button
                                onClick={() => setSortKey('Rating')}
                                className={sortKey === 'Rating' && 'buttonSelected'}
                            >
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
            )}
        </>
    );
}
