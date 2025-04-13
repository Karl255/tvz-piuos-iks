import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PropTypes from 'prop-types';

import './post.css';
import { useMutation } from '@tanstack/react-query';
import { addComment, getComments } from './PostDataService';
import { AuthContext } from '../../pages/Auth/Auth';

export function Comments({ postId, numberOfComments, incrementComments }) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const { id } = useContext(AuthContext);

    const { mutate: useGetComments } = useMutation({
        mutationFn: getComments,
        onSuccess: (res) => {
            setComments(res);
            setOpen(true);
        },
    });

    const { mutate: useAddComment } = useMutation({
        mutationFn: addComment,
        onSucess: () => {
            incrementComments();
            useGetComments();
        },
    });

    function submitComment(event) {
        event.preventDefault();
        useAddComment({ idKorisnik: id, idPost: postId, content: event.target.newComment.value });
    }
    return (
        <>
            <div>
                <ChatBubbleOutlineIcon
                    onClick={() => useGetComments({ idObjava: postId })}
                    className="postIcon transition"
                />{' '}
                <div>{numberOfComments}</div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modal comments">
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
