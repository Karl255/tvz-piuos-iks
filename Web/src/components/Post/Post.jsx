import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { Container, Box } from '@mui/material';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Comments } from './Comments';
import { Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { ratePost, unratePost } from '../../services/PostDataService';
import { AuthContext } from '../../pages/Auth/Auth';

export function Post({ post, rating }) {
    const [userPostRating, setUserPostRating] = useState(rating ? rating.Value : 0);
    const [postRating, setPostRating] = useState(post.Rating);
    const { id } = useContext(AuthContext);

    const { mutate: useRatePost } = useMutation({
        mutationFn: ratePost,
        onSuccess: (data, variables) => {
            setUserPostRating(variables.value);
            setPostRating((prev) => prev + variables.value);
        },
    });
    const { mutateAsync: useUnratePostAsync, mutate: useUnratePost } = useMutation({
        mutationFn: unratePost,
        onSuccess: () => {
            if (userPostRating === 1) setPostRating((prev) => prev - 1);
            else setPostRating((prev) => prev + 1);
            setUserPostRating(0);
        },
    });

    async function pressLike() {
        if (userPostRating === 0) useRatePost({ idKorisnik: id, idPost: post.PostID, value: 1 });
        else if (userPostRating === 1) {
            useUnratePost({ idKorisnik: id, idPost: post.PostID });
        } else {
            await useUnratePostAsync({ idKorisnik: id, idPost: post.PostID });
            useRatePost({ idKorisnik: id, idPost: post.PostID, value: 1 });
        }
    }
    async function pressDislike() {
        if (userPostRating === 0) useRatePost({ idKorisnik: id, idPost: post.PostID, value: -1 });
        else if (userPostRating === -1) {
            useUnratePost({ idKorisnik: id, idPost: post.PostID });
        } else {
            await useUnratePostAsync({ idKorisnik: id, idPost: post.PostID });
            useRatePost({ idKorisnik: id, idPost: post.PostID, value: -1 });
        }
    }

    useEffect(() => {
        setPostRating(post.Rating);
    }, [post]);

    return (
        <Container className="section">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={`/profile/${post.UserID}`} className="postLink">
                    {post.Username}
                </Link>
                <div style={{ color: 'var(--text-darker)' }}>
                    {' '}
                    {post.DateOfPosting && post.DateOfPosting.slice(0, 10)}
                </div>
            </Box>

            <Box
                sx={{
                    margin: '0.8em 0',
                    borderRadius: '8px',
                    padding: '1em',
                    backgroundColor: 'var(--background-darker)',
                }}
            >
                {post.Content}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} className="bottomBar">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '15%' }}>
                    <div>
                        <div className="postIcon transition" onClick={pressLike}>
                            {userPostRating === 1 ? (
                                <ThumbUpIcon
                                    sx={{
                                        color: 'var(--primary-color)',
                                    }}
                                />
                            ) : (
                                <ThumbUpOffAltIcon />
                            )}
                        </div>
                    </div>
                    <div>{postRating ? postRating : 0}</div>
                    <div>
                        <div className="postIcon transition" onClick={pressDislike}>
                            {userPostRating === -1 ? (
                                <ThumbDownIcon sx={{ color: 'var(--secondary-color)' }} />
                            ) : (
                                <ThumbDownOffAltIcon />
                            )}
                        </div>
                    </div>
                </Box>
                <Box>
                    <Comments initialNumberOfComments={post.Comments} postId={post.PostID} />
                </Box>
            </Box>
        </Container>
    );
}

Post.propTypes = {
    post: PropTypes.object,
    rating: PropTypes.object,
};
