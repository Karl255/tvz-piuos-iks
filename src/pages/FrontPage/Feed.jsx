import React from 'react';
import { useContext } from 'react';
import { ObjaveContext } from '../../contexts/ObjaveContext';
import { Post } from './Post';

export function Feed() {
    const { objave } = useContext(ObjaveContext);
    return (
        <>
            {objave.map((objava) => {
                return <Post key={objava.idObjava} post={objava} />;
            })}
        </>
    );
}
