import React from 'react';
import PropTypes from 'prop-types';

export function ErrorMessage({ children }) {
    const errorMessage = {
        fontWeight: 'bold',
        color: 'var(--secondary-color)',
        textAlign: 'center',
    };
    return <div style={errorMessage}>{children}</div>;
}

ErrorMessage.propTypes = {
    children: PropTypes.node,
};
