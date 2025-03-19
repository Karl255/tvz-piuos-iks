import React from 'react';
import { useContext } from 'react';
import { ObjaveContext } from '../../contexts/ObjaveContext';
import { Post } from './Post';

import './FrontPage.css';

export function Home() {
    const { objave } = useContext(ObjaveContext);
    return (
        <>
            {objave.map((objava) => {
                return <Post key={objava.idObjava} post={objava} />;
            })}
        </>
    );
}
