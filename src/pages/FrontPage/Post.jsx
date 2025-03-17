import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faComment, faSmile, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export function Post({ post }) {
    return (
        <Container
            sx={{
                padding: '1em',
                margin: '1em 0',
                border: '3px solid var(--black-darker)',
                borderRadius: '1em',
                boxShadow: 'var(--box-shadow)',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{post.idKorisnik}</span>
                <span>{post.datumObjave}</span>
            </Box>

            <Box
                sx={{
                    margin: '0.8em 0',
                    borderRadius: '8px',
                    padding: '0.5em 1em 1em 1em',
                    backgroundColor: 'var(--black-darker)',
                }}
            >
                {post.tekstObjava}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
                    <FontAwesomeIcon className="postIcon" icon={faThumbsUp} />
                    <FontAwesomeIcon className="postIcon" icon={faThumbsDown} />
                    <FontAwesomeIcon className="postIcon" icon={faSmile} />
                </Box>
                <Box>
                    <FontAwesomeIcon className="postIcon" icon={faComment} />
                </Box>
            </Box>
        </Container>
    );
}

Post.propTypes = {
    post: PropTypes.object,
};
