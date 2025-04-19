import React from 'react';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

export function LoadingPage() {
    const loadingDivStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const loadingIconStyle = {
        color: 'var(--primary-color)',
        animation: 'spin 1s ease infinite',
        fontSize: '3em',
    };
    return (
        <div style={loadingDivStyle}>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
            <AutorenewRoundedIcon style={loadingIconStyle} />
        </div>
    );
}
