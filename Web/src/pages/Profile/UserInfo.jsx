import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UsersListModal } from './UsersListModal';

export function UserInfo({ user }) {
    return (
        <Container className="profile section">
            <h2>
                {user.Username} <EditIcon sx={{ cursor: 'pointer' }} />
            </h2>
            <div className="followersBar">
                <UsersListModal title={user.Followers + ' followers'} route={'followers'} />
                <UsersListModal title={user.Following + ' following'} route={'followed'} />
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
};
