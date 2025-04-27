import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as R from 'ramda';
import { AuthContext } from '../../pages/Auth/Auth';
import { useQuery } from '@tanstack/react-query';
import { fetchPostRatings, fetchPosts } from '../../services/PostDataService';
import { LoadingSpinner } from '../LoadingSpinner';
import { Post } from './Post';
import PropTypes from 'prop-types';
import { PostForm } from './PostForm';
import { Box } from '@mui/material';

export const RefetchContext = createContext();

export function PostsList({ route, userId }) {
    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState(route);
    const [sortKey, setSortKey] = useState('Rating');
    const canAddPost = +user.id === +userId;

    // GET POSTS
    const {
        isFetching: postsPending,
        data: postsData,
        refetch: refetchPosts,
    } = useQuery({
        queryKey: [filter, userId],
        queryFn: () => fetchPosts({ route: filter, id: userId }),
    });

    // GET RATINGS
    const { isPending: ratingsPending, data: ratings } = useQuery({
        queryKey: ['postRatings', user.id],
        queryFn: () => fetchPostRatings(user.id),
    });

    const sortedPosts = useMemo(() => {
        if (!postsData) return [];
        return R.sort(R.descend(R.prop(sortKey)), postsData);
    }, [postsData, sortKey]);

    useEffect(() => {
        refetchPosts();
    }, [filter, refetchPosts]);

    return (
        <>
            {postsPending || ratingsPending ? (
                <LoadingSpinner />
            ) : (
                <RefetchContext.Provider value={refetchPosts}>
                    <Box className="frontPageBar">
                        {canAddPost && <PostForm type="new" />}
                        <div>
                            {route !== 'profilePosts' && (
                                <>
                                    <button
                                        onClick={() => setFilter('objave')}
                                        className={filter === 'objave' ? 'buttonSelected' : ''}
                                    >
                                        Public
                                    </button>
                                    <button
                                        onClick={() => setFilter('objavepratitelja')}
                                        className={filter === 'objavepratitelja' ? 'buttonSelected' : ''}
                                        style={{ marginLeft: '0.5em' }}
                                    >
                                        Following
                                    </button>
                                    <div className="divider" />
                                </>
                            )}

                            <button
                                onClick={() => setSortKey('Rating')}
                                className={sortKey === 'Rating' ? 'buttonSelected' : ''}
                            >
                                Popular
                            </button>
                            <button
                                style={{ marginLeft: '0.5em' }}
                                onClick={() => setSortKey('DateOfPosting')}
                                className={sortKey === 'DateOfPosting' ? 'buttonSelected' : ''}
                            >
                                New
                            </button>
                        </div>
                    </Box>
                    {sortedPosts.map((objava) => {
                        {
                            return (
                                !(!canAddPost && objava.Visibility === 'private') && (
                                    <Post
                                        key={objava.PostID}
                                        post={objava}
                                        rating={ratings.find((rating) => rating.idPost === objava.PostID)}
                                    />
                                )
                            );
                        }
                    })}
                </RefetchContext.Provider>
            )}
        </>
    );
}

PostsList.propTypes = {
    route: PropTypes.string,
    userId: PropTypes.string,
};
