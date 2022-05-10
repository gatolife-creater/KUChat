import { useEffect, useState, useReducer } from 'react'
import Gun from 'gun'
import NavBar from "../parts/NavBar";


// initialize gun locally
const gun = Gun({
  peers: [
    'http://localhost:3007/gun'
  ]
})

// create the initial state to hold the messages
const initialState = {
  messages: []
}

// Create a reducer that will update the messages array
function reducer(state, message) {
  return {
    messages: [message, ...state.messages]
  }
}

const PeerToPeer = () => {
    /// the form state manages the form input for creating a new message
    const [formState, setForm] = useState({
        chain:""
      })
    
      // initialize the reducer & state for holding the messages array
      const [state, dispatch] = useReducer(reducer, initialState)
    
      // when the app loads, fetch the current messages and load them into the state
      // this also subscribes to new data as it changes and updates the local state
      useEffect(() => {
        const messages = gun.get('messages')
        messages.map().on(m => {
          dispatch({
            blockchain:m.blockchain,
            createdAt: m.createdAt
          })
        })
      }, [])
    
      // set a new message in gun, update the local state to reset the form field
      function saveMessage() {
        const messages = gun.get('messages')
        messages.set({
            blockchain:formState.blockchain,
            createdAt: Date.now()
        })
        setForm({
            blockchain:""
        })
      }
    
      // update the form state as the user types
      function onChange(e) {
        setForm({ ...formState, [e.target.name]: e.target.value  })
      }
    
      return (
          <>
            <NavBar />
            <main>
            <div style={{ padding: 30 }}>
                <input
                    onChange={onChange}
                    placeholder="Name"  
                    name="blockchain"
                    value={formState.blockchain}
                />
                <button onClick={saveMessage}>Send Message</button>
                {
                    state.messages.map(message => (
                    <div key={message.createdAt}>
                        <h2>{message.blockchain}</h2>
                        <p>Date: {message.createdAt}</p>
                    </div>
                    ))
                }
            </div>
            </main>
          </>
      )
}

export default PeerToPeer;