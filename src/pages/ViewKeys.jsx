import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import { keysList } from "../libs/cf" 

function ViewKey() {
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const { isAuthenticated, isLoading } = useAuth0()
  useEffect(() => {
    if(!isLoading){
      if(isAuthenticated) {
        keysList().then((data) => {
          setKeys(data.keys)
          setLoading(false)
          toast.success('Keys loaded', { 
            autoClose: 2000,
            closeOnClick: true,
          })
        }).catch((err) => {
          toast.error(err.message, { 
            autoClose: 2000,
            closeOnClick: true,
          })
        })
      } else{
        toast.error("Cannot create a key without login")
        setTimeout(() => {navigate("/")}, 10000)
      }
    }
  }, [isLoading, isAuthenticated])

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
      <div className='app-container'>
        <h2>View Urls</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul>
              {keys.map((key) => (
                <li key={key.name}>
                  <Link to={`/update/${key.name}`}>{key.name}</Link>
                </li>
              ))}
            </ul>

            <br />
            <button onClick={() => navigate("/")}>&#8592;</button>
            <button onClick={() => navigate("/create")}>Create +</button>
          </>
        )}
      </div>
    </div>
  )
}

export default ViewKey
