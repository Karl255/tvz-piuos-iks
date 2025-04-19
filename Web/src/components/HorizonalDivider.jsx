import React from 'react';
import PropTypes from 'prop-types';

export function HorizontalDivider({ margin, color }) {
    const dividerStyle = {
        border: `1px solid ${color}`,
        borderRadius: 'var(--border-radius)',
        height: '0px',
        margin: `${margin} 0`,
    };

    return <div style={dividerStyle} />;
}

HorizontalDivider.propTypes = {
    margin: PropTypes.string,
    color: PropTypes.string,
};
