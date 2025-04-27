import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { Container, Box } from '@mui/material';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Comments } from './Comments';
import { Link, useLocation, useParams } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratePost, unratePost } from '../../services/PostDataService';
import { AuthContext } from '../../pages/Auth/Auth';
import { formatDatePost } from './formatDatePost';
import { PostForm } from './PostForm';

export function Post({ post, rating }) {
    const [userPostRating, setUserPostRating] = useState(rating ? rating.Value : 0);
    const [postRating, setPostRating] = useState(+post.Rating);
    const { id, Username } = useContext(AuthContext).user;
    const { pathname } = useLocation();
    const params = useParams();
    const usersPost = pathname.includes('/feed') ? Username === post.Username : +params.id === +id;
    const queryClient = useQueryClient();

    const { mutate: useRatePost } = useMutation({
        mutationFn: ratePost,
        onSuccess: (data, variables) => {
            setUserPostRating(variables.value);
            setPostRating((prev) => prev + variables.value);
            queryClient.invalidateQueries({ queryKey: ['postRatings', id] });
        },
    });
    const { mutateAsync: useUnratePostAsync, mutate: useUnratePost } = useMutation({
        mutationFn: unratePost,
        onSuccess: () => {
            if (userPostRating === 1) setPostRating((prev) => prev - 1);
            else setPostRating((prev) => prev + 1);
            setUserPostRating(0);
            queryClient.invalidateQueries({ queryKey: ['postRatings', id] });
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
        setPostRating(+post.Rating);
    }, [post]);

    return (
        <Container className="section post">
            <Box className="flexHorizontal postTopBar">
                <div className="postTopBarLeft">
                    <Link to={`/profile/${post.UserID}`} className="postLink">
                        {post.Username}
                    </Link>
                    <div style={post.Username ? { marginLeft: '0.5em' } : undefined}>{post.Visibility}</div>
                </div>

                <div className={usersPost ? 'postDateDiv editPostButtonDiv' : 'postDateDiv'}>
                    <div className="postDate">{formatDatePost(post.DateOfPosting)}</div>
                    {usersPost && <PostForm post={post} type="edit" />}
                </div>
            </Box>

            <Box className="postContent">{post.Content}</Box>

            <Box className="bottomBar flexHorizontal">
                <div className="ratingButtons">
                    <div className="postIcon transition" onClick={!usersPost ? pressLike : undefined}>
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
                    <div>{postRating}</div>
                    <div className="postIcon transition" onClick={!usersPost ? pressDislike : undefined}>
                        {userPostRating === -1 ? (
                            <ThumbDownIcon sx={{ color: 'var(--secondary-color)' }} />
                        ) : (
                            <ThumbDownOffAltIcon />
                        )}
                    </div>
                </div>
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
