import React, { useState } from 'react'
import Artiste from './Artiste'
import Place from './Place'
import User from './User'

const Dashboard = () => {


 //definition par defaut de la page line up 
    const[page, setPage] = useState('Artiste')

    //gestion de la page a afficher avec un parametre qui definira la page a afficher
    const handlePage= (thePage) => {
        setPage(thePage)
    }

    //gestion du style du bouton si il est actif ou non
    const getButtonClass = (thepage) => {
        return page === thepage
            ? "littleBouton  mx-2 bgRouge blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2"
            : "littleBouton  mx-2 bgVert blanc px-3 py-2 px-lg-3 py-lg-2 col-5 mx-auto my-3 col-lg-2";
    };

  return (
    <div className='dashboard my-5 d-flex flex-column align-items-center '>
      <div className='d-lg-flex w-lg-100 justify-content-end marginUnderNav'>

      </div>
      <h1 className='titleFont titleSize noir mb-5'>Dashboard</h1>

<div className="d-flex flex-column align-content-center">
                <div className="container row footer px-3 titleFont">
                <button className={getButtonClass('Artiste')} onClick={()=>{handlePage('Artiste')}}>Artiste</button>
                <button  className={getButtonClass('Place')} onClick={()=>{handlePage('Place')}}>Localisations</button>
                <button  className={getButtonClass('User')} onClick={()=>{handlePage('User')}}>Utilisateurs</button>
                </div>
                
            </div>
            <div className='w-100' >
                <div className=" d-flex justify-content-center my-5 ">

                {page === 'Artiste' && <Artiste />}
                {page === 'Place' && <Place />}
                {page === 'User' && <User/>}


                </div>
            </div>
    </div>
  )
}

export default Dashboard