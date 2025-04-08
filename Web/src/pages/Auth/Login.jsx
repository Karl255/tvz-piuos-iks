import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { login } from './AuthDataService';
import { useMutation } from '@tanstack/react-query';
import { LoadingPage } from '../../components/LoadingPage';

export function Login({ setUser, setLoggedIn }) {
    const { register, handleSubmit } = useForm();

    const { isPending, mutate } = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            setUser(res.user);
            setLoggedIn(true);
        },
        onError: () => {
            alert('Error');
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
                            <input type="text" name="username" required {...register('Username')} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required {...register('Password')} />
                        </div>
                        <button type="submit" className="greenButton">
                            Log in
                        </button>
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
