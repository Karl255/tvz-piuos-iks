import { Modal } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

export function UsersListModal({ title, list }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function visitProfile(id) {
        setOpen(false);
        navigate(`/profile/${id}`);
    }
    return (
        <>
            <button style={{ marginRight: '0.5em' }} onClick={list.length ? () => setOpen(true) : undefined}>
                {title}
            </button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ maxHeight: 'fit-content' }}>
                <div className="modal comments">
                    {list.map((user, index) => (
                        <div key={index} className="userDiv">
                            <div onClick={() => visitProfile(user.id)} className="postLink">
                                {user.Username}
                            </div>
                            <div style={{ color: 'var(--text-darker)' }}>
                                {user.Name} {user.Surname}
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
}

UsersListModal.propTypes = {
    title: PropTypes.string,
    list: PropTypes.array,
};
