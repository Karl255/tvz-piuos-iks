import { Modal } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function UsersListModal({ route, title }) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    async function fetchData(route) {
        try {
            let response = await fetch(`http://localhost:8080/api/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idKorisnik: 5 }),
            });

            let res = await response.json();
            setUsers(res);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchDataAsync = async () => {
        await fetchData(route);
    };
    return (
        <>
            <button style={{ marginRight: '0.5em' }} onClick={fetchDataAsync}>
                {title}
            </button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ maxHeight: 'fit-content' }}>
                <div className="modal">
                    {users.map((user, index) => (
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
    route: PropTypes.string,
};
