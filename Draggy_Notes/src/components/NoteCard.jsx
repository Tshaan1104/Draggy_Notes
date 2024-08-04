/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Spinner from '../assets/spinner';
import React, { useEffect, useRef, useState } from 'react'
// import Trash from './trashicon';
import Deletebutton from './deletebutton';
import { db } from '../appwrite/databases';
import { useContext } from 'react';
import { setNewOffset, autoGrow, setZIndex, bodyparser } from '../utils';

const NoteCard = ({ note }) => {
    const [saving, setsaving] = useState(false);
    const keyUpTimer = useRef(null);


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

        if (e.target.className === 'card-header') {
            mousestartposition.x = e.clientX;
            mousestartposition.y = e.clientY;

            document.addEventListener("mousemove", mousemove),
                document.addEventListener("mouseup", mouseup),
                setZIndex(cardref.current);

        }
    };

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

        const newposition = setNewOffset(cardref.current);
        savedata('position', newposition);
        db.notes.update(note.$id, { position: JSON.stringify(newposition) })
    }

    const savedata = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };

        try {
            await db.notes.update(note.$id, payload)
        }
        catch (error) {
            console.error(error);
        }
    }

    const handlekeyup = () => {
        setsaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
        keyUpTimer.current = setTimeout(() => {
            savedata("body", textaredref.current.value);
        }, 2000);
    }


    return (

        <div className='card' ref={cardref} style={{
            backgroundColor: colors.colorBody, left: `${position.x}px`,
            top: `${position.y}px`,
        }}>

            <div className='card-header' onMouseDown={mouseDown} style={{ backgroundColor: colors.colorHeader }}><Deletebutton  noteid={note.$id} /> {saving && (
                <div className="card-saving">
                    <Spinner color={colors.colorText} />
                    <span style={{ color: colors.colorText }}>
                        Saving...
                    </span>
                </div>
            )}</div>

            <div className='card-body'>
                <textarea
                    onKeyUp={handlekeyup}
                    style={{ color: colors.colorText }} defaultValue={body} onInput={() => {
                        autoGrow(textaredref)
                    }} onFocus={() => {
                        setZIndex(cardref.current);
                    }} ref={textaredref}></textarea>
            </div></div>
    )
}

export default NoteCard