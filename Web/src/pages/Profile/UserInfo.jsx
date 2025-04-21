import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UsersListModal } from './UsersListModal';
import { AuthContext } from '../Auth/Auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { follow, unfollow } from '../../services/ProfileDataService';
import { useParams } from 'react-router';

export function UserInfo({ user, followers, following }) {
    const { id } = useContext(AuthContext);
    const params = useParams();
    const queryClient = useQueryClient();
    const [followingStatus, setFollowingStatus] = useState(false);

    const { mutate: setFollow } = useMutation({
        mutationFn: follow,
        onSuccess: () => {
            setFollowingStatus(true);
            queryClient.invalidateQueries({ queryKey: ['followers', params.id] });
        },
    });
    const { mutate: setUnfollow } = useMutation({
        mutationFn: unfollow,
        onSuccess: () => {
            setFollowingStatus(false);
            queryClient.invalidateQueries({ queryKey: ['followers', params.id] });
        },
    });

    useEffect(() => {
        if (id !== user.id) {
            if (followers.find((element) => element.id === id)) setFollowingStatus(true);
        }
    }, [params.id]);

    function useSetFollow() {
        if (!followingStatus) setFollow({ idUser: id, idFollow: user.id });
        else setUnfollow({ idUser: id, idFollow: user.id });
    }

    return (
        <Container className="profile section">
            <div className="profileHeader">
                <h1>
                    {user.Username} {id === user.id && <EditIcon sx={{ cursor: 'pointer' }} />}
                </h1>
                {id !== user.id && (
                    <button
                        onClick={() => useSetFollow()}
                        className={!followingStatus ? 'greenButton' : 'greenButtonTrans'}
                    >
                        {followingStatus ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>

            <div className="followersBar">
                <UsersListModal title={followers.length + ' followers'} list={followers} />
                <UsersListModal title={following.length + ' following'} list={following} />
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
