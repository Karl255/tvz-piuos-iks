import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Box } from '@mui/material';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Comments } from './Comments';
import { Link } from 'react-router';

export function Post({ post }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [postRating, setPostRating] = useState(post.Rating);
    const [numberOfComments, setNumberOfComments] = useState(post.Comments);

    function pressLike() {
        setLiked((prevLiked) => {
            const newLiked = !prevLiked;
            setPostRating(newLiked ? postRating + 1 : postRating - 1);
            return newLiked;
        });
    }
    function pressDislike() {
        setDisliked((prevDisliked) => {
            const newDisliked = !prevDisliked;
            setPostRating(newDisliked ? postRating - 1 : postRating + 1);
            return newDisliked;
        });
    }

    useEffect(() => {
        setPostRating(post.Rating);
    }, [post]);

    function incrementNumberOfComments() {
        setNumberOfComments((prev) => prev + 1);
    }

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
                            {liked ? (
                                <ThumbUpIcon
                                    sx={{
                                        color: 'var(--primary-color)',
                                        opacity: liked ? '100%' : '0',
                                    }}
                                />
                            ) : (
                                <ThumbUpOffAltIcon sx={{ opacity: liked ? '0' : '100%' }} />
                            )}
                        </div>
                    </div>
                    <div>{postRating}</div>
                    <div>
                        <div className="postIcon transition" onClick={pressDislike}>
                            {disliked ? (
                                <ThumbDownIcon sx={{ color: 'var(--secondary-color)' }} />
                            ) : (
                                <ThumbDownOffAltIcon />
                            )}
                        </div>
                    </div>
                </Box>
                <Box>
                    <Comments
                        numberOfComments={numberOfComments}
                        postId={post.PostID}
                        incrementComments={incrementNumberOfComments}
                    />
                </Box>
            </Box>
        </Container>
    );
}

Post.propTypes = {
    post: PropTypes.object,
};
