import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';

import './newPost.css';

export function NewPost() {
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <button onClick={() => setOpen(true)} className="addPostButton">
                New post
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modal">New post</div>
            </Modal>
        </Box>
    );
}
