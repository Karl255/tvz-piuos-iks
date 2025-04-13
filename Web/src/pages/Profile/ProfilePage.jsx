import React from 'react';
import { UserInfo } from './UserInfo';

import './profile.css';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router';
import { useQueries } from '@tanstack/react-query';
import { getProfile } from './ProfileDataService';
import { LoadingPage } from '../../components/LoadingPage';

export function ProfilePage() {
    const params = useParams();

    const queries = useQueries({
        queries: [
            {
                queryKey: ['profile', params.id],
                queryFn: () => getProfile({ route: 'profile', id: params.id }),
            },
            {
                queryKey: ['followers', params.id],
                queryFn: () => getProfile({ route: 'followers', id: params.id }),
            },
            {
                queryKey: ['followed', params.id],
                queryFn: () => getProfile({ route: 'followed', id: params.id }),
            },
            {
                queryKey: ['profilePosts', params.id],
                queryFn: () => getProfile({ route: 'profileposts', id: params.id }),
            },
        ],
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    return (
        <>
            {queries.pending ? (
                <LoadingPage />
            ) : (
                <>
                    <UserInfo user={queries.data[0]} followers={queries.data[1]} following={queries.data[2]} />
                    {queries.data[3].map((post, i) => {
                        return <Post key={i} post={post} />;
                    })}
                </>
            )}
        </>
    );
}
