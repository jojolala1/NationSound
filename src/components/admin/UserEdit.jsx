import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'
import { div } from 'three/tsl'

const UserEdit = ({ user, setSelectedUser, handleSetToggle }) => {

  const [passwordSee, setPasswrdSee] = useState('password')

  const [userEdit, setUserEdit] = useState({
    email: user.email,
    password: '',
    firstName: user.firstName,
    lastName: user.lastName
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userPatch = {}
    if (userEdit.email !== user.email) {
      userPatch.email = userEdit.email
    }
    if (userEdit.password !== '') {
      userPatch.password = userEdit.password
    }
    if (userEdit.firstName !== user.firstName) {
      userPatch.firstName = userEdit.firstName
    }
    if (userEdit.lastName !== user.lastName) {
      userPatch.lastName = userEdit.lastName
    }
    try {
      const res = await apiFunctions.modifyEntity('users', userPatch, user.id)
      console.log('reponse de l\'api', res)
      setSelectedUser(null)
      handleSetToggle()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setUserEdit(
      {
        email: user.email,
        password: '',
        firstName: user.firstName,
        lastName: user.lastName
      })
  }, [user])
  const togglePassword = () => {
    //on peut rajouter une vraiante d'icon oeil pour remlacer 'voir'
    if (passwordSee === 'password') {
      setPasswrdSee('text')
    } else {
      setPasswrdSee('password')
    }
  }

  const handleOnChange = (e) => {
    setUserEdit({
      ...userEdit,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className=' overlay bgGRey'>
      
      <div className='d-flex flex-column align-items-center mb-5 bgBlanc p-5 rounded gap-4 position-fixed z-3 bgGrey'>
        <h1>modifier {user.email}</h1>
        <form onSubmit={handleSubmit}>
          <div className='group d-flex flex-column align-items-center'>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name='email'
              id='email'
              autoComplete='email'
              value={userEdit.email}
              onChange={handleOnChange}
            />
          </div>
          <div className='group d-flex flex-column align-items-center'>
            <label htmlFor="password">Mot de passe</label>
            <div className="d-flex">
              <input
                type={passwordSee}
                name='password'
                id='password'
                autoComplete='new-password'
                value={userEdit.password}
                onChange={handleOnChange}

              />
              <button onClick={(e) => {
                e.preventDefault()
                togglePassword()
              }}>voir</button>
            </div>
          </div>
          <div className='group d-flex flex-column align-items-center'>
            <label htmlFor="firstName">Prenom</label>
            <input
              type="text"
              name='firstName'
              id='firstName'
              autoComplete='given-name'
              value={userEdit.firstName}
              onChange={handleOnChange}

            />
          </div>
          <div className='group d-flex flex-column align-items-center'>
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              name='lastName'
              id='lastName'

              autoComplete='family-name'
              value={userEdit.lastName}
              onChange={handleOnChange}

            />
          </div>
          <button type='submit'>Modifier</button>
        </form>
        <button onClick={() => setSelectedUser(null)}>annuler</button>
      </div>
    </div>

  )
}

export default UserEdit