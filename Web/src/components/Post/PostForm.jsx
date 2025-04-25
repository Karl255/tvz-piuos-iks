import { Modal } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPost, editPost } from '../../services/PostDataService';
import { LoadingSpinner } from '../LoadingSpinner';
import { AuthContext } from '../../pages/Auth/Auth';
import PropTypes from 'prop-types';
import { Tooltip } from '../Tooltip/Tooltip';
import { RefetchContext } from './PostsList';

export function PostForm({ type, post = {} }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { reset, formState, register, handleSubmit } = useForm();
    const { id } = useContext(AuthContext);
    const refetchPosts = useContext(RefetchContext);

    const { mutate, isPending } = useMutation({
        mutationFn: type === 'new' ? addPost : editPost,
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['profilePosts'] });
            setOpen(false);
            refetchPosts();
        },
    });

    async function onSubmit(data) {
        if (type === 'new')
            mutate({ idKorisnik: id, content: data.content, visibility: data.visibility ? 'public' : 'followers' });
        else
            mutate({
                idPost: post.PostID,
                content: data.content,
                visibility: data.visibility ? 'public' : 'followers',
            });
    }
    return (
        <>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                <>
                    {type === 'new' ? (
                        <button onClick={() => setOpen(true)} className="greenButton">
                            New post
                        </button>
                    ) : (
                        <button onClick={() => setOpen(true)} className="editPostButton whiteButton">
                            Edit post
                        </button>
                    )}
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="modal auth">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1>{type === 'new' ? 'New post' : 'Edit Post'}</h1>
                                <div>
                                    <div className="label">
                                        <label htmlFor="content">Content</label>
                                        <Tooltip>Required between 1 - 281 characters</Tooltip>
                                    </div>

                                    <textarea
                                        {...register(
                                            'content',
                                            { value: post.Content },
                                            { required: true, minLength: 1, maxLength: 281 },
                                        )}
                                        className={formState.errors.content && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Visibility (Followers / Public)</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            {...register('visibility', {
                                                value: post.Visibility === 'public' ? true : false,
                                            })}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <button type="submit" className="greenButton">
                                    Save
                                </button>
                            </form>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}

PostForm.propTypes = {
    refetch: PropTypes.func,
    type: PropTypes.string,
    post: PropTypes.object,
};
