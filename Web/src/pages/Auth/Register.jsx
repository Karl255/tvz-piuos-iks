import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from './AuthDataService';
import { useMutation } from '@tanstack/react-query';
import { LoadingPage } from '../../components/LoadingPage';

export function Register() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const { isPending, mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => setOpen(false),
        onError: () => alert('Error'),
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
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" {...register('Username')} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" {...register('Password')} />
                                </div>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" {...register('Name')} />
                                </div>
                                <div>
                                    <label htmlFor="surname">Surname</label>
                                    <input type="text" name="surname" {...register('Surname')} />
                                </div>
                                <div>
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input type="date" max={new Date()} {...register('DateOfBirth')} />
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}
