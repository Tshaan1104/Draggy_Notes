/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import Trash from './trashicon';
import { setNewOffset, autoGrow, setZIndex,bodyparser } from '../utils';

const NoteCard = ({ note }) => {
    const body = bodyparser(note.body);
    const [position, setposition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const textaredref = useRef(null);


    let mousestartposition = { x: 0, y: 0 };
    const cardref = useRef(null);

    useEffect(() => {
        autoGrow(textaredref)
    }, []);



    const mouseDown = (e) => {
        mousestartposition.x = e.clientX;
        mousestartposition.y = e.clientY;

        document.addEventListener("mousemove", mousemove),
            document.addEventListener("mouseup", mouseup),
            setZIndex(cardref.current);

    }

    const mousemove = (e) => {
        let mouseMovedir = { x: mousestartposition.x - e.clientX, y: mousestartposition.y - e.clientY }

        console.log("mouseDIr:", mouseMovedir);

        mousestartposition.x = e.clientX;
        mousestartposition.y = e.clientY;

        const newposition = setNewOffset(cardref.current, mouseMovedir);
        setposition(newposition);

        // setposition({
        //     x: cardref.current.offsetLeft - mouseMovedir.x,
        //     y: cardref.current.offsetTop - mouseMovedir.y
        // })
    };
    const mouseup = () => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
    }


    return (

        <div className='card' ref={cardref} style={{
            backgroundColor: colors.colorBody, left: `${position.x}px`,
            top: `${position.y}px`,
        }}>

            <div className='card-header' onMouseDown={mouseDown} style={{ backgroundColor: colors.colorHeader }}><Trash /></div>

            <div className='card-body'>
                <textarea style={{ color: colors.colorText }}  defaultValue={body} onInput={() => {
                    autoGrow(textaredref)
                }} onFocus={() => {
                    setZIndex(cardref.current);
                }} ref={textaredref}></textarea>
            </div></div>
    )
}

export default NoteCard