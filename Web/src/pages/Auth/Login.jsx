import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { login } from './AuthDataService';
import { useMutation } from '@tanstack/react-query';
import { LoadingPage } from '../../components/LoadingPage';
import { ErrorMessage } from '../../components/ErrorMessage';

export function Login({ setUser, setLoggedIn }) {
    const { formState, register, handleSubmit } = useForm();

    const { isError, isPending, mutate } = useMutation({
        mutationFn: login,
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
                <LoadingPage />
            ) : (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Log In</h1>
                        <div>
                            <label htmlFor="username">Username</label>
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
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 8, maxLength: 20 })}
                                className={formState.errors.password && 'invalid'}
                            />
                        </div>
                        <button type="submit" className="greenButton">
                            Log in
                        </button>
                    </form>
                    {isError && <ErrorMessage>Wrong Username or Password!</ErrorMessage>}
                </div>
            )}
        </>
    );
}

Login.propTypes = {
    setUser: PropTypes.func,
    setLoggedIn: PropTypes.func,
};
