/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import { fakeData as notes } from "../assets/fakejsondata.js";
import NoteCard from '../components/NoteCard';
// import NoteCard from '../components/NoteCard';
import { db } from '../appwrite/databases';

import { client,databases } from '../appwrite/config';


const NotesPage = () => {

  const [notes,setnotes]=useState([]);

  useEffect(()=>{
    init()
  },[]);
  const init=async()=>{
    const response=await db.notes.list();
    // const response=await databases.listDocuments(
    //   import.meta.env.VITE_DATABASE_ID,
    //   import.meta.env.VITE_COLLECTION_NOTES_ID

    // );

    setnotes(response.documents);
  }

  return <div>{notes.map(note => (<NoteCard key={note.$id} note={note} />))}</div>;

};

export default NotesPage;