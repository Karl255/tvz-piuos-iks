import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from './AuthDataService';
import { useMutation } from '@tanstack/react-query';
import { LoadingPage } from '../../components/LoadingPage';
import { ErrorMessage } from '../../components/ErrorMessage';

export function Register() {
    const [open, setOpen] = useState(false);
    const { reset, formState, register, handleSubmit } = useForm();

    const { isError, isPending, mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            reset();
            setOpen(false);
        },
    });

    async function onSubmit(data) {
        mutate(data);
    }

    return (
        <>
            {isPending ? (
                <LoadingPage />
            ) : (
                <>
                    <button onClick={() => setOpen(true)}>Register</button>

                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="modal auth section">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1>Registration</h1>
                                <div>
                                    <label htmlFor="Username">Username</label>
                                    <input
                                        type="text"
                                        {...register('Username', { required: true, minLength: 4, maxLength: 20 })}
                                        className={formState.errors.Username && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <input
                                        type="password"
                                        {...register('Password', { required: true, minLength: 8, maxLength: 20 })}
                                        className={formState.errors.Password && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Name">Name</label>
                                    <input
                                        type="text"
                                        {...register('Name', { required: true, minLength: 2, maxLength: 25 })}
                                        className={formState.errors.Name && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Surname">Surname</label>
                                    <input
                                        type="text"
                                        {...register('Surname', { required: true, minLength: 2, maxLength: 25 })}
                                        className={formState.errors.Surname && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="DateOfBirth">Date of Birth</label>
                                    <input
                                        type="date"
                                        {...register('DateOfBirth', {
                                            required: true,
                                            max: new Date().toISOString().split('T')[0],
                                        })}
                                        className={formState.errors.DateOfBirth && 'invalid'}
                                    />
                                </div>
                                <button type="submit" className="greenButton">
                                    Submit
                                </button>
                            </form>
                            {isError && <ErrorMessage>User already exists</ErrorMessage>}
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}
