import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'
import PlaceEdit from './PlaceEdit'
import PlaceDelete from './PlaceDelete'
import PlaceAdd from './PlaceAdd'

const Place = () => {
  
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedAddPlace, setSelectedAddPlace] = useState(null)

  const [selectedDeletePlace, setSelectedDeletePlace] = useState(null)

  const [toggleSetPlace, setToggleSetPlace] = useState(0)

  const handleSetToggle = () => {
    setToggleSetPlace((prevToggle) => (prevToggle === 0 ? 1 : 0)); // Toggle entre 0 et 1
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFunctions.fetchEntity('places')
      console.log('reponse de l\'api', res)
      if (res.error) {
        setError(res)
      } else {
        setPlaces(res.data.member);
      }
      setLoading(false)

    };

    fetchData();
  }, [toggleSetPlace])

  if (loading) return <p className='titleFont titleSize noir'>chargement...</p>
  if (error) {
    console.log('ereeeuuur', error)
    return <div>erreur : {error.message}</div>
  }


  return (<>
    {selectedPlace ? <PlaceEdit artiste={selectedPlace} setSelectedPlace={setSelectedPlace} handleSetToggle={handleSetToggle} /> : null}
    {selectedDeletePlace ? <PlaceDelete Artistes={selectedDeletePlace} setSelectedDeletePlace={setSelectedDeletePlace} handleSetToggle={handleSetToggle} /> : null}
    {selectedAddPlace ? <PlaceAdd handleSetToggle={handleSetToggle} setSelectedPlace={setSelectedAddPlace} /> : null}

    <div className='wDashboard d-flex flex-column align-items-center '>
      <p className='mb-5 titleFont titleSize text-center noir '>Localisations</p>
      <button className='bouton bgVert blanc py-2 px-3 titleFont' onClick={() => setSelectedAddPlace(1)}>Ajouter une localisation</button>
      <p className='mb-5 titleFont textSize text-center noir mt-5'>liste des localisations : </p>

      <div className='d-flex flex-column gap-3 '>

        {places.length > 0 ? (
          places.map((place) => {
            return <div key={place.id} className='bgBlanc p-4 rounded d-flex flex-column align-items-center gap-3'>
              <p className='textLittleSize'>Localisation : <span className='fw-bold'>{place.name}</span></p>
              <p >style : <span className='fw-bold'>{place.style}</span></p>
              <p >scene : <span className='fw-bold'>{place.stage}</span></p>
              <p >date : <span className='fw-bold'>{new Date(place.date).toLocaleDateString('Fr-fr', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span></p>
              <p >heure : <span className='fw-bold'>{new Date(place.time).toLocaleTimeString('Fr-fr', {
                hour: 'numeric',
                minute: 'numeric',

              })} </span></p>


              <div className='d-flex justify-content-around  '>
                <button className='littleBouton shadow-none bgVert blanc mx-3 py-2 px-3' onClick={() => {
                  setSelectedPlace(place),
                  console.log(place)
                }}>modifier</button>
                <button className='littleBouton shadow-none bgRouge blanc mx-3 py-2 px-3' onClick={() => setSelectedDeletePlace(place)}>supprimer</button>
              </div>
            </div>
          }))
          : (<p>aucun utilisateur</p>)
        }
      </div>
    </div>
  </>

  )
}
export default Place