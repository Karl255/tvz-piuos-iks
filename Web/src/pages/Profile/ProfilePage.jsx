import React from 'react';
import { UserInfo } from './UserInfo';

import './profile.css';
import { useParams } from 'react-router';
import { useQueries } from '@tanstack/react-query';
import { getProfile } from '../../services/ProfileDataService';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { PostsList } from '../../components/Post/PostsList';

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
                <LoadingSpinner />
            ) : (
                <>
                    <UserInfo user={queries.data[0]} followers={queries.data[1]} following={queries.data[2]} />
                    <PostsList route={'profilePosts'} userId={params.id} />
                </>
            )}
        </>
    );
}
