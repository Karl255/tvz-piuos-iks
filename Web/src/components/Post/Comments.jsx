import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PropTypes from 'prop-types';

import './post.css';
import { useMutation } from '@tanstack/react-query';
import { addComment, getComments } from '../../services/PostDataService';
import { AuthContext } from '../../pages/Auth/Auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { LoadingSpinner } from '../LoadingSpinner';

export function Comments({ postId, initialNumberOfComments }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const { user } = useContext(AuthContext);
    const { id, Username } = user;
    const [numberOfComments, setNumberOfComments] = useState(initialNumberOfComments);
    const [newContent, setNewContent] = useState('');

    const { reset, formState, register, handleSubmit } = useForm();

    const { mutate: useGetComments } = useMutation({
        mutationFn: getComments,
        onSuccess: (res) => {
            setComments(res);
            setOpen(true);
        },
    });

    const { isPending, mutate: useAddComment } = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            setNumberOfComments((prev) => prev + 1);
            setComments([...comments, { id, Username, Content: newContent }]);
            reset();
        },
    });

    function submitComment(data) {
        useAddComment({ idKorisnik: id, idPost: postId, content: data.content });
        setNewContent(data.content);
    }

    function visitProfile(id) {
        setOpen(false);
        navigate(`/profile/${id}`);
    }
    return (
        <>
            {isPending && <LoadingSpinner />}
            <div>
                <ChatBubbleOutlineIcon
                    onClick={() => useGetComments({ idObjava: postId })}
                    className="postIcon transition"
                />{' '}
                <div>{numberOfComments ? numberOfComments : 0}</div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modal commentsModal">
                    <div className="comments">
                        {comments.length ? (
                            comments.map((comment, index) => (
                                <div key={index}>
                                    <div className="postLink" onClick={() => visitProfile(comment.id)}>
                                        {comment.Username}
                                    </div>
                                    <div style={{ color: 'var(--text)', fontStyle: 'italic', margin: '0.5em 0' }}>
                                        {comment.Content}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: 'var(--text-darker)' }}>No comments</div>
                        )}
                    </div>

                    <div className="commentForm">
                        <form onSubmit={handleSubmit(submitComment)}>
                            <input
                                type="text"
                                placeholder="Comment"
                                {...register('content', { required: true, minLength: 1, maxLength: 200 })}
                                className={formState.errors.content && 'invalid'}
                            />
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
    initialNumberOfComments: PropTypes.number,
    incrementComments: PropTypes.func,
};
