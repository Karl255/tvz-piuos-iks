import React from 'react';
import PropTypes from 'prop-types';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import './tooltip.css';

export function Tooltip({ children }) {
    const tooltipStyle = {
        color: 'var(--text-darker)',
        fontSize: '1.2em',
    };
    return (
        <div className="tooltip">
            <HelpOutlineRoundedIcon style={tooltipStyle} />
            <span className="tooltiptext">{children}</span>
        </div>
    );
}

Tooltip.propTypes = {
    children: PropTypes.node,
};
