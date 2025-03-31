import { Modal } from '@mui/material';
import React, { useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PropTypes from 'prop-types';

import './post.css';

export function Comments({ postId, numberOfComments, incrementComments }) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    async function fetchData(route, body) {
        try {
            let response = await fetch(`http://localhost:8080/api/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            let res = await response.json();
            if (route == 'comments') {
                setComments(res);
                setOpen(true);
            } else {
                incrementComments();
                setOpen(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const fetchDataAsync = async (route, body) => {
        await fetchData(route, body);
    };

    function submitComment(event) {
        event.preventDefault();
        fetchDataAsync('makecomment', { idKorisnik: 5, idPost: postId, content: event.target.newComment.value });
    }
    return (
        <>
            <div>
                <ChatBubbleOutlineIcon
                    onClick={() => fetchDataAsync('comments', { idObjava: postId })}
                    className="postIcon transition"
                />{' '}
                <div>{numberOfComments}</div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modal">
                    {comments.map((comment, index) => (
                        <div key={index}>
                            <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{comment.Username}</div>
                            <div style={{ color: 'var(--text)', fontStyle: 'italic', margin: '0.5em 0' }}>
                                {comment.Content}
                            </div>
                        </div>
                    ))}
                    <div className="commentForm">
                        <form onSubmit={submitComment}>
                            <input type="text" placeholder="Comment" name="newComment" id="newComment" />
                            <button type="submit" style={{ width: 'fit-content' }}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
}

Comments.propTypes = {
    postId: PropTypes.number,
    numberOfComments: PropTypes.number,
    incrementComments: PropTypes.func,
};
