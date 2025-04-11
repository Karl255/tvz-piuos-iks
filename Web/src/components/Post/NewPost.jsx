import { Modal } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPost } from './PostDataService';
import { LoadingPage } from '../LoadingPage';
import { AuthContext } from '../../pages/Auth/Auth';

export function NewPost() {
    const [open, setOpen] = useState(false);
    const { reset, formState, register, handleSubmit } = useForm();
    const { id } = useContext(AuthContext);

    const { mutate, isPending } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            reset();
            setOpen(false);
        },
    });

    async function onSubmit(data) {
        mutate({ idKorisnik: id, content: data.content, visibility: data.visibility ? 'public' : 'followers' });
    }
    return (
        <>
            {isPending ? (
                <LoadingPage />
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
                                    <label htmlFor="content">Content</label>
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
