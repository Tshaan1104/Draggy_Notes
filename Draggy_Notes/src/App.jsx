import NoteProvider from "./context/NoteContext"
import NotesPage from "./pages/NotesPage"


function App() {

  return (
   <div id="App">
      
    <NoteProvider>
<NotesPage/>
    </NoteProvider>
   </div>
  )
}

export default App
