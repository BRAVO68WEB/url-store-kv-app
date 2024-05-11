import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { getKey, updateKey, deleteKey } from "../libs/cf" 

function Updatekey() {
  const { isAuthenticated, isLoading } = useAuth0()
  const [key, setKey] = useState({})
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if(isAuthenticated) {
        const key = window.location.pathname.split('/')[2]
        getKey(key).then((data) => {
          setKey(key)
          setValue(data.value)
          setLoading(false)
          toast.success('Value fetched successfully', {
            autoClose: 2000,
            closeOnClick: true,
          })
        }).catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
            closeOnClick: true,
          })
        })
      }
      else {
        toast.error("Cannot create a key without login")
        setTimeout(() => {navigate("/")}, 3000)
      }
    }
  }, [isLoading, isAuthenticated])

  const save = async () => {
    await updateKey(key, value)
      .then(() => {
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

  const remove = async () => {
    await deleteKey(key)
      .then(() => {
        toast.success('Key removed successfully', {
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

  if(!isAuthenticated) {
    return (
      <div>
        <h2>Unauthorized</h2>
        <p>You need to be logged in to create a key</p>
      </div>
    )
  }

  return (
    <div className="app-home">
      <div className='app-container'>
        <h2>Update Slugs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <label>
              Slug:
              <input type="text" value={key} disabled />
            </label>
            <br />
            <label>
              Original Url:
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            </label>
            <br />
            <button onClick={save}>Save</button>
            <button onClick={remove}>Remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Updatekey
