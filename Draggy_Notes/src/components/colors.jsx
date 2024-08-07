import React from 'react'
import colors from "../assets/colors.json"
import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import { db } from '../appwrite/databases'

const Colors = ({color}) => {
    const {selectednote,notes,setnotes}=useContext(NoteContext)
    const changecolor=()=>{
       try{
const currentnoteindex= notes.findIndex(
    (note)=> note.$id=== selectednote.$id
)
const updatednote={
    ...notes[currentnoteindex],
    colors:JSON.stringify(color),
};
const newNOtes=[...notes];
newNOtes[currentnoteindex]=updatednote;
setnotes(newNOtes);

db.notes.update(selectednote.$id,{colors:JSON.stringify(color)})
       } catch(err){
        alert("You must select a note before changing colors");

       }

    }
  return (
    <div className='color' onClick={changecolor} style={{background:color.colorHeader}}></div>
  )
}

export default Colors