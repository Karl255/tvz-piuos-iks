import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UsersListModal } from './UsersListModal';
import { AuthContext } from '../Auth/Auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { follow, unfollow } from '../../services/ProfileDataService';
import { useNavigate, useParams } from 'react-router';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { addChat } from '../../services/ChatsDataService';
import { useForm } from 'react-hook-form';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { editProfile } from '../../services/AuthDataService';

export function UserInfo({ user, refetch, followers, following }) {
    const { user: userContext, dispatch } = useContext(AuthContext);
    const id = userContext.id;
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [followingStatus, setFollowingStatus] = useState(false);
    const { register, formState, reset, handleSubmit } = useForm();
    const [editingUsername, setEditingUsername] = useState(false);
    const isLoggedUser = id === user.id;

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

    const { mutate: createChat } = useMutation({
        mutationFn: addChat,
        onSuccess: (data) => {
            navigate(`/inbox/chat/${data[0].chatId}`, { state: { username: user.Username, userId: user.id } });
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

    const { mutate: editUsername } = useMutation({
        mutationFn: editProfile,
        onSuccess: (data, variables) => {
            dispatch({ type: 'SET_USERNAME', payload: variables.username });
            queryClient.invalidateQueries();
            setEditingUsername(false);

            refetch();
        },
    });

    function onSubmit(data) {
        editUsername({ idKorisnik: user.id, username: data.username });
    }

    return (
        <Container className="profile section">
            <div className="profileHeader">
                {editingUsername ? (
                    <span>
                        <form>
                            <input
                                type="text"
                                className={`editUsernameInput ${formState.errors.username ? 'invalidUsername' : ''}`}
                                defaultValue={user.Username}
                                {...register('username', { required: true, minLength: 5, maxLength: 20 })}
                            />
                            <CheckRoundedIcon className="confirmButton" onClick={handleSubmit(onSubmit)} />
                            <ClearRoundedIcon
                                className="cancelButton"
                                onClick={() => {
                                    setEditingUsername(false);
                                    reset();
                                }}
                            />
                        </form>
                    </span>
                ) : (
                    <h1>
                        {user.Username}{' '}
                        {isLoggedUser && (
                            <EditIcon sx={{ cursor: 'pointer' }} onClick={() => setEditingUsername(true)} />
                        )}
                    </h1>
                )}
                <div className="followersBar">
                    <UsersListModal title={followers.length + ' followers'} list={followers} />
                    <UsersListModal title={following.length + ' following'} list={following} />
                </div>
            </div>

            {!isLoggedUser && (
                <div className="flexHorizontal">
                    <button
                        className="darkerButton flexVerticalAlign"
                        onClick={() => createChat({ id1: id, id2: user.id })}
                    >
                        Message user
                        <MessageRoundedIcon className="chatIcon" />
                    </button>
                    <button
                        onClick={() => useSetFollow()}
                        className={!followingStatus ? 'greenButton' : 'greenButtonTrans'}
                    >
                        {followingStatus ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            )}

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
    refetch: PropTypes.func,
    followers: PropTypes.array,
    following: PropTypes.array,
};
