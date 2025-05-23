import React, { useState, useContext } from 'react';
import { Box } from '@mui/material';
import './feed.css';
import { NewPost } from '../../components/Post/NewPost';
import { AuthContext } from '../Auth/Auth';
import { PostsList } from '../../components/Post/PostsList';

export function Feed() {
    const user = useContext(AuthContext);
    const [sortKey, setSortKey] = useState('Rating');
    const [filter, setFilter] = useState('objave');
    const [triggerRefetch, setTriggerRefetch] = useState(true);

    return (
        <>
            <Box className="frontPageBar">
                <NewPost refetch={setTriggerRefetch} />
                <div>
                    <button onClick={() => setFilter('objave')} className={filter === 'objave' && 'buttonSelected'}>
                        Public
                    </button>
                    <button
                        onClick={() => setFilter('objavepratitelja')}
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
            <PostsList route={filter} userId={user.id} sortKey={sortKey} refetch={triggerRefetch} />
        </>
    );
}
