import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Box } from '@mui/material';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export function Post({ post }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [postRating, setPostRating] = useState(post.PostRating);

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

    return (
        <Container className="section">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--primary-color)', cursor: 'default' }}>
                    {post.username}
                </div>
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
                    <div>
                        <ChatBubbleOutlineIcon className="postIcon transition" /> <div>{post.BrojKomentara}</div>
                    </div>
                </Box>
            </Box>
        </Container>
    );
}

Post.propTypes = {
    post: PropTypes.object,
};
