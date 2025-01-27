import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'

const UserDelete = ({ user, setSelectedDeleteUser, handleSetToggle }) => {

  const deleteUser = () => {
    apiFunctions.deleteEntity('users',user.id)
    setSelectedDeleteUser(null)
    handleSetToggle()
  }

  return (
    <div className=' overlay bgGRey'>
      
      <div className='d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey'>
        <h1>Suprimer {user.firstName} {user.lastName}</h1>
        <p>Etes vous sur de vouloir s'uprimer l'utilisateur  {user.firstName} {user.lastName} ?</p>
        <p>mail : {user.email}</p>
                <button onClick={() => deleteUser()}>supprimer</button>
                <button onClick={() => setSelectedDeleteUser(null)}>annuler</button>

      </div>
    </div>

  )
}

export default UserDelete