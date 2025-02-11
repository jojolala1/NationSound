import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'
import PlaceEdit from './PlaceEdit'
import PlaceDelete from './PlaceDelete'
import PlaceAdd from './PlaceAdd'
import { useNavigate } from 'react-router-dom'

const Place = () => {

  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedAddPlace, setSelectedAddPlace] = useState(null)

  const [selectedDeletePlace, setSelectedDeletePlace] = useState(null)

  const [toggleSetPlace, setToggleSetPlace] = useState(0)

  const categories = {
    'scènes': 'bi bi-music-note-beamed',
    'snacks': 'bi bi-cup-hot',
    'parkings': 'bi bi-car-front',
    'toilettes' : 'bi bi-badge-wc',
    'buvettes' : 'bi bi-cup-straw',
    'soins' : 'bi bi-hospital',
    'campings' : 'bi bi-houses',
    'boutiques' : 'bi bi-basket2'
  }






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

        setPlaces(res.data.member.reduce((acc, x) => {
          if (!acc[x.category]) {
            acc[x.category] = []
          }
          acc[x.category].push(x)
          return acc
        }, {}));
      }

      setLoading(false)

    };

    fetchData();
  }, [toggleSetPlace])

  useEffect(() => {
    console.log('Places mises à jour:', places);
  }, [places])


  const navigate = useNavigate()


  if (loading) return <p className='titleFont titleSize noir'>chargement...</p>
  if (error) {
    console.log('ereeeuuur', error)
    return <div>
      {error.code === 401 && navigate('/login')}
      <p>erreur : {error.message} </p>
    </div>
  }

  if (!places) {
    return <p>pas de localisations</p>
  }


  return (<>
    {selectedPlace ? <PlaceEdit place={selectedPlace} setSelectedPlace={setSelectedPlace} handleSetToggle={handleSetToggle} categories={categories} /> : null}
    {selectedDeletePlace ? <PlaceDelete place={selectedDeletePlace} setSelectedDeletePlace={setSelectedDeletePlace} handleSetToggle={handleSetToggle} /> : null}
    {selectedAddPlace ? <PlaceAdd handleSetToggle={handleSetToggle} setSelectedPlace={setSelectedAddPlace} categories={categories} /> : null}

    <div className='wDashboard d-flex flex-column align-items-center '>
      <p className='mb-5 titleFont titleSize text-center noir '>Localisations</p>
      <button className='bouton bgVert blanc py-2 px-3 titleFont' onClick={() => setSelectedAddPlace(1)}>Ajouter une localisation</button>
      <p className='mb-5 titleFont textSize text-center noir mt-5'>liste des localisations : </p>

      <div className='d-flex justify-content-center gap-3 row'>
        {
          Object.entries(places).map(([category, placesPerCategory], key) => {
            return (
              <div key={key} className='rounded   col-12 col-md-6  col-lg-4 col-xl-3 d-flex flex-column position-relative'>

                <h2 className='text-center bg-secondary blanc w-100 px-5 rounded mb-0 py-2' >{category}</h2>


                {placesPerCategory.length > 0 ? (
                  placesPerCategory.map((place) => {
                    return <div key={place.id} className='bgBlanc p-4 rounded d-flex flex-column  align-items-center gap-3 border'>
                      <p className='textLittleSize'>Nom : <span className='fw-bold'>{place.name}</span></p>

                      <p >ouverture : <span className='fw-bold'>{new Date(place.opening).toISOString().substring(11, 16)}h</span></p>
                      <p >fermeture : <span className='fw-bold'>{new Date(place.closing).toISOString().substring(11, 16)}h</span></p>
                      <div className='d-flex justify-content-around  '>
                        <button className='littleBouton shadow-none bgVert blanc mx-3 py-2 px-3' onClick={() => {
                          setSelectedPlace(place),
                            console.log(place)
                        }}>modifier</button>
                        <button className='littleBouton shadow-none bgRouge blanc mx-3 py-2 px-3' onClick={() => setSelectedDeletePlace(place)}>supprimer</button>
                      </div>
                    </div>
                  }))
                  : (<p>aucune localisation</p>)
                }
              </div>
            )
          })
        }
      </div>
    </div>
  </>

  )
}
export default Place








