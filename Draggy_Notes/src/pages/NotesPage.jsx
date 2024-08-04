/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import { fakeData as notes } from "../assets/fakejsondata.js";
import NoteCard from '../components/NoteCard';
// import NoteCard from '../components/NoteCard';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';


const NotesPage = () => {

  const {notes}=useContext(NoteContext);

  return <div>{notes.map(note => (<NoteCard key={note.$id} note={note}  />))}</div>;

};

export default NotesPage;