import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLogto } from '@logto/react';
import { useNavigate } from 'react-router-dom'

import { updateKey } from "../libs/cf" 

const generateCode = (noofchars) => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < noofchars; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const randomize = () => {
  document.getElementById('urlkey').value = generateCode(6)
}

function CreateKey() {
  const { isAuthenticated, isLoading } = useLogto()
  const [key, setKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  if(!isAuthenticated && !isLoading) {
    toast.error('You need to be logged in to create a key', {
      autoClose: 2000,
      closeOnClick: true,
    })

    setTimeout(() => {navigate("/")}, 3000)
    return (
      <div>
        <h2>Unauthorized</h2>
        <p>You need to be logged in to create a key</p>

        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    )
  }

  const save = async () => {
    updateKey(key, value).then(() => {
      setLoading(false)
      toast.success('Value updated successfully', {
        autoClose: 2000,
        closeOnClick: true,
      })

      setTimeout(() => {navigate("/view")}, 3000)
    })
    .catch((err) => {
      toast.error(err.message, {
        autoClose: 2000,
        closeOnClick: true,
      })
    })
  }

  return (
    <div className="app-home">
      <div className='app-container'>
        <h2>Create Short link</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className='input-label'>
            <label>
              Slug:
            </label>
            <br />
            <input type="text" value={key} onChange={(e) => setKey(e.target.value)} id="urlkey" />
            </div>
            <div className='input-label'>
            <label>
              Original URL:
            </label>
              <br />
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <br />
            </div>
            <button onClick={() => navigate("/")}>&#8592;</button>
            <button onClick={randomize}>Randomize</button>
            <button onClick={save}>Save</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateKey
