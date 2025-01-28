import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'

const UserDelete = ({ user, setSelectedDeleteUser, handleSetToggle }) => {

  const deleteUser = () => {
    apiFunctions.deleteEntity('users',user.id)
    setSelectedDeleteUser(null)
    handleSetToggle()
  }

  return (
    <div onClick={() => setSelectedDeleteUser(null)} className=' overlay bgGRey'>
          
          <div className='d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey mx-2' onClick={(e) => e.stopPropagation()} >
        
        
        <p className='text-center textSize'>Etes vous sur de vouloir s'uprimer l'utilisateur <span className='fw-bold'>{user.firstName} {user.lastName}</span> ?</p>
        <p className='text-center'>mail : <span className='fw-bold'>{user.email}</span></p>
                <button className='bouton bgVert blanc  py-2' onClick={() => deleteUser()}>supprimer</button>
                <button className='bouton bgRouge blanc  py-2' onClick={() => setSelectedDeleteUser(null)}>annuler</button>

      </div>
    </div>

  )
}

export default UserDelete