import { Modal } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPost } from '../../services/PostDataService';
import { LoadingSpinner } from '../LoadingSpinner';
import { AuthContext } from '../../pages/Auth/Auth';
import PropTypes from 'prop-types';
import { Tooltip } from '../Tooltip/Tooltip';

export function NewPost({ refetch }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { reset, formState, register, handleSubmit } = useForm();
    const { id } = useContext(AuthContext);

    const { mutate, isPending } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setOpen(false);
            refetch();
        },
    });

    async function onSubmit(data) {
        mutate({ idKorisnik: id, content: data.content, visibility: data.visibility ? 'public' : 'followers' });
    }
    return (
        <>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                <>
                    <button onClick={() => setOpen(true)} className="greenButton">
                        New post
                    </button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="modal auth">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1>New post</h1>
                                <div>
                                    <div className="label">
                                        <label htmlFor="content">Content</label>
                                        <Tooltip>Required between 1 - 281 characters</Tooltip>
                                    </div>

                                    <textarea
                                        {...register('content', { required: true, minLength: 1, maxLength: 281 })}
                                        className={formState.errors.content && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Visibility (Followers / Public)</label>
                                    <label className="switch">
                                        <input type="checkbox" {...register('visibility')} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                <button type="submit" className="greenButton">
                                    Add
                                </button>
                            </form>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}

NewPost.propTypes = {
    refetch: PropTypes.func,
};
