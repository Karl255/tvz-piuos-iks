import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/AuthDataService';
import { useMutation } from '@tanstack/react-query';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { REGISTER_BUTTON } from '../../constants/test-ids';

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
                <LoadingSpinner />
            ) : (
                <>
                    <button onClick={() => setOpen(true)} data-test-id={REGISTER_BUTTON}>
                        Register
                    </button>

                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="modal auth section">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1>Registration</h1>
                                <div>
                                    <div className="label">
                                        <label htmlFor="Username">Username</label>
                                        <Tooltip>Required between 5 - 20 characters</Tooltip>
                                    </div>

                                    <input
                                        type="text"
                                        {...register('Username', { required: true, minLength: 5, maxLength: 20 })}
                                        className={formState.errors.Username && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <div className="label">
                                        <label htmlFor="Password">Password</label>
                                        <Tooltip>Required between 8 - 20 characters</Tooltip>
                                    </div>

                                    <input
                                        type="password"
                                        {...register('Password', { required: true, minLength: 8, maxLength: 20 })}
                                        className={formState.errors.Password && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <div className="label">
                                        <label htmlFor="Name">Name</label>
                                        <Tooltip>Required between 2 - 25 characters</Tooltip>
                                    </div>

                                    <input
                                        type="text"
                                        {...register('Name', { required: true, minLength: 2, maxLength: 25 })}
                                        className={formState.errors.Name && 'invalid'}
                                    />
                                </div>
                                <div>
                                    <div className="label">
                                        <label htmlFor="Surname">Surname</label>
                                        <Tooltip>Required between 2 - 25 characters</Tooltip>
                                    </div>

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
                                {isError && <ErrorMessage>User already exists</ErrorMessage>}
                            </form>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}
