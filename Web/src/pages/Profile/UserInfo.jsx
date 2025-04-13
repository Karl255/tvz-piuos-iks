import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UsersListModal } from './UsersListModal';
import { AuthContext } from '../Auth/Auth';
import { useMutation } from '@tanstack/react-query';
import { follow } from './ProfileDataService';
import { useParams } from 'react-router';

export function UserInfo({ user, followers, following }) {
    const { id } = useContext(AuthContext);
    const params = useParams();
    const [followingStatus, setFollowingStatus] = useState(false);

    const { mutate: setFollow } = useMutation({
        mutationFn: follow,
        onSuccess: () => setFollowingStatus(true),
    });

    useEffect(() => {
        if (id !== user.id) {
            if (followers.find((element) => element.id === id)) setFollowingStatus(true);
        }
    }, [params.id]);

    function useSetFollow() {
        if (!followingStatus) setFollow({ idUser: id, idFollow: user.id });
    }

    return (
        <Container className="profile section">
            <div className="profileHeader">
                <h1>
                    {user.Username} {id === user.id && <EditIcon sx={{ cursor: 'pointer' }} />}
                </h1>
                {id !== user.id && (
                    <button onClick={() => useSetFollow()}>{followingStatus ? 'Unfollow' : 'Follow'}</button>
                )}
            </div>

            <div className="followersBar">
                <UsersListModal title={user.Followers + ' followers'} list={followers} />
                <UsersListModal title={user.Following + ' following'} list={following} />
            </div>

            <div className="userInfo">
                <div>First name:</div>
                <div>{user.Name}</div>

                <div>Last name:</div>
                <div>{user.Surname}</div>

                <div>Date of birth:</div>
                <div>{user.DateOfBirth && user.DateOfBirth.slice(0, 10)}</div>
            </div>
        </Container>
    );
}

UserInfo.propTypes = {
    user: PropTypes.object,
    followers: PropTypes.array,
    following: PropTypes.array,
};
