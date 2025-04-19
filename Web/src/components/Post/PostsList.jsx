import React, { useContext, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { AuthContext } from '../../pages/Auth/Auth';
import { useQuery } from '@tanstack/react-query';
import { fetchPostRatings, fetchPosts } from '../../services/PostDataService';
import { LoadingSpinner } from '../LoadingSpinner';
import { Post } from './Post';
import PropTypes from 'prop-types';

export function PostsList({ route, userId, sortKey, refetch }) {
    const user = useContext(AuthContext);

    const {
        isFetching: postsPending,
        data: postsData,
        refetch: refetchPosts,
    } = useQuery({
        queryKey: [route, userId],
        queryFn: () => fetchPosts({ route, id: userId }),
        enabled: false,
    });
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
    }, [route, refetch]);

    useEffect(() => {}, [sortKey]);

    return (
        <>
            {postsPending || ratingsPending ? (
                <LoadingSpinner />
            ) : (
                <>
                    {sortedPosts.map((objava) => {
                        return (
                            <Post
                                key={objava.PostID}
                                post={objava}
                                rating={ratings.find((rating) => rating.idPost === objava.PostID)}
                            />
                        );
                    })}
                </>
            )}
        </>
    );
}

PostsList.propTypes = {
    route: PropTypes.string,
    userId: PropTypes.string,
    sortKey: PropTypes.string,
    refetch: PropTypes.bool,
};
