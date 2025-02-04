import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'
import ArtisteEdit from './ArtisteEdit'
import ArtisteDelete from './ArtisteDelete'
import ArtisteAdd from './ArtisteAdd'



const Artiste = () => {

  const [artistes, setArtistes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedArtiste, setSelectedArtiste] = useState(null)
  const [selectedAddArtiste, setSelectedAddArtiste] = useState(null)

  const [selectedDeleteArtiste, setSelectedDeleteArtiste] = useState(null)

  const [toggleSetArtiste, setToggleSetArtiste] = useState(0)

  const handleSetToggle = () => {
    setToggleSetArtiste((prevToggle) => (prevToggle === 0 ? 1 : 0)); // Toggle entre 0 et 1
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFunctions.fetchEntity('artistes')
      console.log('reponse de l\'api', res)
      if (res.error) {
        setError(res)
      } else {
        setArtistes(res.data.member);
      }
      setLoading(false)

    };

    fetchData();
  }, [toggleSetArtiste])

  if (loading) return <p className='titleFont titleSize noir'>chargement...</p>
  if (error) {
    console.log('ereeeuuur', error)
    return <div>erreur : {error.message}</div>
  }


  return (<>
    {selectedArtiste ? <ArtisteEdit artiste={selectedArtiste} setSelectedArtiste={setSelectedArtiste} handleSetToggle={handleSetToggle} /> : null}
    {selectedDeleteArtiste ? <ArtisteDelete Artistes={selectedDeleteArtiste} setSelectedDeleteArtiste={setSelectedDeleteArtiste} handleSetToggle={handleSetToggle} /> : null}
    {selectedAddArtiste ? <ArtisteAdd handleSetToggle={handleSetToggle} setSelectedArtiste={setSelectedAddArtiste} /> : null}

    <div className='wDashboard d-flex flex-column align-items-center '>
      <p className='mb-5 titleFont titleSize text-center noir '>Artistes</p>
      <button className='bouton bgVert blanc py-2 px-3 titleFont' onClick={() => setSelectedAddArtiste(1)}>Ajouter un artiste</button>
      <p className='mb-5 titleFont textSize text-center noir mt-5'>liste des artistes : </p>

      <div className='d-flex flex-column gap-3 '>

        {artistes.length > 0 ? (
          artistes.map((artiste) => {
            return <div key={artiste.id} className='bgBlanc p-4 rounded d-flex flex-column align-items-center gap-3'>
              <p className='textLittleSize'>Artiste : <span className='fw-bold'>{artiste.name}</span></p>
              <p >style : <span className='fw-bold'>{artiste.style}</span></p>
              <p >scene : <span className='fw-bold'>{artiste.stage}</span></p>
              <p >date : <span className='fw-bold'>{new Date(artiste.date).toLocaleDateString('Fr-fr', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span></p>
              <p >heure : <span className='fw-bold'>{new Date(artiste.time).toLocaleTimeString('Fr-fr', {
                hour: 'numeric',
                minute: 'numeric',

              })} </span></p>


              <div className='d-flex justify-content-around  '>
                <button className='littleBouton shadow-none bgVert blanc mx-3 py-2 px-3' onClick={() => {
                  setSelectedArtiste(artiste),
                  console.log(artiste)
                }}>modifier</button>
                <button className='littleBouton shadow-none bgRouge blanc mx-3 py-2 px-3' onClick={() => setSelectedDeleteArtiste(artiste)}>supprimer</button>
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

export default Artiste