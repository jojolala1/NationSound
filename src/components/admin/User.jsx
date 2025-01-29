import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'
import UserEdit from './UserEdit'
import UserDelete from './UserDelete'
import UserAdd from './UserAdd'



const User = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedAddUser, setSelectedAddUser] = useState(null)

  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null)

  const [toggleSetUser, setToggleSetUser] = useState(0)

  const handleSetToggle = () => {
    setToggleSetUser((prevToggle) => (prevToggle === 0 ? 1 : 0)); // Toggle entre 0 et 1
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFunctions.fetchEntity('users')
      console.log('reponse de l\'api', res)
      if (res.error) {
        setError(res)
      } else {
        setUsers(res.data.member);
      }
      setLoading(false)

    };

    fetchData();
  }, [toggleSetUser])

  if (loading) return <p className='titleFont titleSize noir'>chargement...</p>
  if (error) {
    console.log('ereeeuuur', error)
    return <div>erreur : {error.message}</div>
  }


  return (<>
    {selectedUser ? <UserEdit user={selectedUser} setSelectedUser={setSelectedUser} handleSetToggle={handleSetToggle} /> : null}
    {selectedDeleteUser ? <UserDelete user={selectedDeleteUser} setSelectedDeleteUser={setSelectedDeleteUser} handleSetToggle={handleSetToggle} /> : null}
    {selectedAddUser ? <UserAdd handleSetToggle={handleSetToggle} setSelectedUser={setSelectedAddUser} /> : null}

    <div className='wDashboard d-flex flex-column align-items-center '>
      <p className='mb-5 titleFont titleSize text-center noir '>utilisateurs</p>
      <button className='bouton bgVert blanc py-2 px-3 titleFont' onClick={() => setSelectedAddUser(1)}>Ajouter un utilisateur</button>
      <p className='mb-5 titleFont textSize text-center noir mt-5'>liste des utilisateurs : </p>

      <div className='d-flex flex-column gap-3 '>

        {users.length > 0 ? (
          users.map((user) => {
            return <div key={user.id} className='bgBlanc p-4 rounded d-flex flex-column align-items-center gap-3'>
              <p className='textLittleSize'>utilisateur : <span className='fw-bold'>{user.firstName} {user.lastName}</span></p>
              <p >E-mail : <span className='fw-bold'>{user.email}</span></p>

              <div className='d-flex justify-content-around  '>
                <button className='littleBouton shadow-none bgVert blanc mx-3 py-2 px-3' onClick={() => setSelectedUser(user)}>modifier</button>
                <button className='littleBouton shadow-none bgRouge blanc mx-3 py-2 px-3' onClick={() => setSelectedDeleteUser(user)}>supprimer</button>
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

export default User