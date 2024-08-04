import React from 'react'
import Plus from './plus'
import colors from '../assets/colors.json'
import { useRef } from 'react'
import { db } from '../appwrite/databases'
import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'


export const Addbutton = () => {

    const {setnotes}=useContext(NoteContext);

const startingpos=useRef(10);

const addnote=async()=>{
    const payload={
        position:JSON.stringify({
            x:startingpos.current,
            y:startingpos.current,
        }),
        colors:JSON.stringify(colors[0]),
    };
    startingpos.current +=10;
    const response =db.notes.create(payload);
    setnotes((prevState) => [response, ...prevState]);
    console.log(response)
}

    return (
        <div id="add-btn" onClick={addnote}><Plus /></div>
    )
}
