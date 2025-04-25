import React, { useContext } from 'react';
import './feed.css';
import { AuthContext } from '../Auth/Auth';
import { PostsList } from '../../components/Post/PostsList';

export function Feed() {
    const user = useContext(AuthContext);

    return (
        <>
            {/* <Box className="frontPageBar">
                <PostForm refetch={setTriggerRefetch} type="new" />
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
            </Box> */}
            <PostsList route={'objave'} userId={user.id} />
        </>
    );
}
