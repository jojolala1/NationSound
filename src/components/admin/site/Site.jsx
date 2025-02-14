import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../../logic/apiFunctions'
import SiteEdit from './SiteEdit'

import { useNavigate } from 'react-router-dom'



const Site = () => {

  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)

  const [toggleSetSite, setToggleSetSite] = useState(0)

  const handleSetToggle = () => {
    setToggleSetSite((prevToggle) => (prevToggle === 0 ? 1 : 0)); // Toggle entre 0 et 1
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFunctions.fetchEntity('sites/1')
      if (res.error) {
        setError(res)
      } else {
        setSite(res.data);
      }
      setLoading(false)

    };

    fetchData();
  }, [toggleSetSite])

  const navigate = useNavigate();

  if (loading) return <p className='titleFont titleSize noir'>chargement...</p>
  if (error) {
    return <div>
      {error.code === 401 && navigate('/login')}
      <p>erreur : {error.message} </p>
    </div>
  }


  return (<>
    {selectedSite ? <SiteEdit site={selectedSite} setSelectedSite={setSelectedSite} handleSetToggle={handleSetToggle} /> : null}


    <div className='wDashboard d-flex flex-column align-items-center '>

      <div className='d-flex flex-column gap-3 '>

        {site ?

          <div key={site.id} className='bgBlanc p-4 rounded d-flex flex-column align-items-center gap-3'>
            <p className='textLittleSize'><span className='fw-bold'>{site.name}</span></p>
            <p >Latitude : <span className='fw-bold'>{site.latitude}</span></p>
            <p >Longitude : <span className='fw-bold'>{site.longitude}</span></p>

            <div className='d-flex justify-content-around  '>
              <button className='littleBouton shadow-none bgVert blanc mx-3 py-2 px-3' onClick={() => setSelectedSite(site)}>modifier</button>
            </div>
          </div>

          : <p>site non disponible</p>
        }
      </div>
    </div>
  </>

  )
}

export default Site