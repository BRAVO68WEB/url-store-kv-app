import { useState, useEffect } from 'react'
import { useLogto } from '@logto/react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import { fetchStats, keysList } from "../libs/cf";

function ViewKey() {
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [totolKeys, setTotalKeys] = useState(0)
  const [totalViews, setTotalViews] = useState(0)

  const { isAuthenticated, isLoading } = useLogto()
  const navigate = useNavigate()
  
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

    fetchStats().then((data) => {
      setTotalKeys(data.total_keys)
      setTotalViews(data.total_views)
    })
  }, [isLoading, isAuthenticated, navigate])

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
        <h2>View Urls</h2>
        <h3>Total Keys : {totolKeys} | Total Views : {totalViews}</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {keys.map((key) => (
                <li key={key.name}>
                  <Link to={`/update/${key.name}`}>{key.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='app-container-nav'>
        <button onClick={() => navigate("/")}>&#8592;</button>
        <button onClick={() => navigate("/create")}>Create +</button>
      </div>
    </div>
  )
}

export default ViewKey
