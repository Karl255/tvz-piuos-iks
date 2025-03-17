import PropTypes from 'prop-types';
import React from 'react';
import { objava } from '../data/objava.json';
import { ObjaveContext } from './ObjaveContext';

export function ObjaveContextProvider({ children }) {
    const objave = objava;
    return <ObjaveContext.Provider value={{ objave }}>{children}</ObjaveContext.Provider>;
}

ObjaveContextProvider.propTypes = {
    children: PropTypes.element,
};
