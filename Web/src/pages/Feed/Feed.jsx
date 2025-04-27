import React, { useContext } from 'react';
import './feed.css';
import { AuthContext } from '../Auth/Auth';
import { PostsList } from '../../components/Post/PostsList';

export function Feed() {
    const { user } = useContext(AuthContext);

    return <PostsList route={'objave'} userId={user.id} />;
}
