import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLogto } from '@logto/react';

import { getKey, updateKey, deleteKey } from "../libs/cf";

function Updatekey() {
  const { isAuthenticated, isLoading } = useLogto()
  const [key, setKey] = useState({})
  const [views , setViews] = useState(0)
  const [lastViewed, setLastViewed] = useState(0)
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
          setViews(data.results[0]?.count)
          setLastViewed(data.results[0]?.updated_at)
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
  }, [isLoading, isAuthenticated, navigate])

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
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    )
  }

  return (
    <div className="app-home">
      <div className='app-container app-form'>
        <h2>Update Slugs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className='input-label'>
              <label htmlFor="key">
                Slug:
              </label>
              <input type="text" value={key} disabled />
            </div>
            <div className='input-label'>
              <label htmlFor="views">
                Views Count:
              </label>
              <input type="text" value={views} disabled />
            </div>
            <div className='input-label'>
              <label htmlFor="lastViewed">
                Last Viewed On:
              </label>
              <input type="text" value={lastViewed} disabled />
            </div>
            <div className='input-label'>
              <label htmlFor="value">
                Original Url:
              </label>
                <textarea type="text" value={value} onChange={(e) => setValue(e.target.value)} />
              </div>
            <br />
          </div>
        )}
      </div>
      <div className='app-container-nav'>
        <button onClick={() => navigate("/view")}>&#8592;</button>
        <button onClick={save}>Save</button>
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  )
}

export default Updatekey
