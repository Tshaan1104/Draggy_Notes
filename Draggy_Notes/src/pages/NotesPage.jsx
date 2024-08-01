/* eslint-disable no-unused-vars */
import React from 'react';
import { fakeData as notes } from "../assets/fakejsondata.js";
import NoteCard from '../components/NoteCard';

const NotesPage = () => {
  return <div>{notes.map(note => (<NoteCard key={note.$id} note={note} />))}</div>;

};

export default NotesPage;