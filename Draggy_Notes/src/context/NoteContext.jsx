import { createContext,useEffect,useState } from "react";
import Spinner from "../assets/spinner";
import { db } from "../appwrite/databases";

export const NoteContext=createContext()

const NoteProvider=({children})=>{
const [notes,setnotes]=useState([]);
const [loading ,setloading ]=useState(true);


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
    setloading(false);
  }
const contextdata={notes,setnotes};

    return <NoteContext.Provider value={contextdata}>
        {loading ? <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div> : children}
    </NoteContext.Provider>
};

export default NoteProvider;