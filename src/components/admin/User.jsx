import React, { useEffect, useState } from 'react'
import { apiFunctions } from '../logic/apiFunctions'
import UserEdit from './UserEdit'
import UserDelete from './UserDelete'



const User = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null)

  const [toggleSetUser, setToggleSetUser] = useState(0)

  const handleSetToggle = () => {
    setToggleSetUser((prevToggle) => (prevToggle === 0 ? 1 : 0)); // Toggle entre 0 et 1
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFunctions.fetchEntity('users')
        console.log('reponce de l\'api', res)
        setUsers(res.data.member);
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [toggleSetUser])

  if (loading) return <p>chargement...</p>
  if (error) return <p>erreur : Veuilliez vous reconnecter</p>


  return (<>
        {selectedUser ? <UserEdit user={selectedUser} setSelectedUser={setSelectedUser} handleSetToggle={handleSetToggle}/> : null}
        {selectedDeleteUser ? <UserDelete user={selectedDeleteUser} setSelectedDeleteUser={setSelectedDeleteUser} handleSetToggle={handleSetToggle}/> : null}

        <div className='w-50'>
      <h1 className='mb-5'>liste des utilisateurs</h1>
      <div className='d-flex flex-column gap-3'>
        
        {users.length > 0 ? (
          users.map((user) => {
            return <div key={user.id} className='bgBlanc p-3 rounded d-flex flex-column align-items-center '> 
              <p >mail : <span className='fw-bold'>{user.email}</span></p>
              <div className='d-flex justify-content-around w-100 '>
                <button className='littleBouton shadow-none bgVert blanc' onClick={()=>setSelectedUser(user)}>modifier</button>
                <button className='littleBouton shadow-none bgRouge blanc' onClick={()=>setSelectedDeleteUser(user)}>supprimer</button>
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