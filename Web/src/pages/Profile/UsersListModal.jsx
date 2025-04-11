import { Modal } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function UsersListModal({ title, list }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button style={{ marginRight: '0.5em' }} onClick={() => setOpen(true)}>
                {title}
            </button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ maxHeight: 'fit-content' }}>
                <div className="modal comments">
                    {list.map((user, index) => (
                        <div key={index}>
                            <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{user.Username}</div>
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
