import React from 'react'
import Trash from './trashicon'
import { db } from '../appwrite/databases';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const Deletebutton = ({noteid}) => {
    const {setnotes}=useContext(NoteContext)
    const handledelete=async()=>{
        db.notes.delete(noteid);
                setnotes((prevstate)=>prevstate.filter((note)=>note.$id!==noteid));

    }
  return (
        <div onClick={handledelete}>
            <Trash/>
        </div>
)
}

export default Deletebutton