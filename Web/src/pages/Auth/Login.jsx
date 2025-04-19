import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { loginUser } from '../../services/AuthDataService';
import { useMutation } from '@tanstack/react-query';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Tooltip } from '../../components/Tooltip/Tooltip';

export function Login({ setUser, setLoggedIn }) {
    const { formState, register, handleSubmit } = useForm();

    const { isError, isPending, mutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (res) => {
            setUser(res.user);
            setLoggedIn(true);
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
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Log In</h1>
                        <div>
                            <div className="label">
                                <label htmlFor="username">Username</label>
                                <Tooltip>Required between 5 - 20 characters</Tooltip>
                            </div>

                            <input
                                type="text"
                                {...register('username', {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 20,
                                })}
                                className={formState.errors.username && 'invalid'}
                            />
                        </div>
                        <div>
                            <div className="label">
                                <label htmlFor="password">Password</label>
                                <Tooltip>Required between 8 - 20 characters</Tooltip>
                            </div>

                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 8, maxLength: 20 })}
                                className={formState.errors.password && 'invalid'}
                            />
                        </div>
                        <button type="submit" className="greenButton">
                            Log in
                        </button>
                        {isError && <ErrorMessage>Wrong Username or Password!</ErrorMessage>}
                    </form>
                </div>
            )}
        </>
    );
}

Login.propTypes = {
    setUser: PropTypes.func,
    setLoggedIn: PropTypes.func,
};
