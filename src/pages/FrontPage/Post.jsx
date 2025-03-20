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
    const [likes, setLikes] = useState(post.likes);
    const [disliked, setDisliked] = useState(false);
    const [dislikes, setDislikes] = useState(post.dislikes);

    function pressLike() {
        setLiked((prevLiked) => {
            const newLiked = !prevLiked;
            setLikes(newLiked ? post.likes + 1 : post.likes);
            return newLiked;
        });
    }
    function pressDislike() {
        setDisliked((prevDisliked) => {
            const newDisliked = !prevDisliked;
            setDislikes(newDisliked ? post.dislikes + 1 : post.dislikes);
            return newDisliked;
        });
    }

    return (
        <Container className="section">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)', cursor: 'default' }}>
                    {post.username}
                </span>
                <span style={{ color: 'var(--gray)' }}> {post.datumObjave}</span>
            </Box>

            <Box
                sx={{
                    margin: '0.8em 0',
                    borderRadius: '8px',
                    padding: '1em',
                    backgroundColor: 'var(--black-darker)',
                }}
            >
                {post.tekstObjava}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} className="bottomBar">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '15%' }}>
                    <span>
                        <span className="postIcon transition" onClick={pressLike}>
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
                        </span>
                        <span>{likes}</span>
                    </span>
                    <span>
                        <span className="postIcon transition" onClick={pressDislike}>
                            {disliked ? (
                                <ThumbDownIcon sx={{ color: 'var(--secondary-color)' }} />
                            ) : (
                                <ThumbDownOffAltIcon />
                            )}
                        </span>
                        <span>{dislikes}</span>
                    </span>
                </Box>
                <Box>
                    <span>
                        <ChatBubbleOutlineIcon className="postIcon transition" /> <span>{post.comments}</span>
                    </span>
                </Box>
            </Box>
        </Container>
    );
}

Post.propTypes = {
    post: PropTypes.object,
};
