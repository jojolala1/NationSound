import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { authFunctions } from '../logic/authFunctions'
import { tokenService } from '../logic/tokenService'

export const Login = () => {
    let navigate = useNavigate()

    const [submitForm, setSumbitForm] = useState({
        email: 'lasthib.tl@gmail.com',
        password: 'Jafirefl1!'
    })

    const onSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/auth', submitForm)
            .then(res => {
                console.log(res)
                authFunctions.saveToken(res.data.token)
                authFunctions.saveRefreshToken(res.data.refresh_token)

                tokenService.startTokenService();

                navigate('/admin')
            })
            .catch(err => console.log(err))
    }

    const handleOnChange = (e) => {
        setSumbitForm({
            ...submitForm,
            [e.target.name]: e.target.value
        })
    }

    const [passwordSee, setPasswrdSee] = useState('password')

    const togglePassword = () => {
        //on peut rajouter une vraiante d'icon oeil pour remlacer 'voir'
        if (passwordSee === 'password') {
            setPasswrdSee('text')
        } else {
            setPasswrdSee('password')
        }
    }

    return (
        <>
            <div className='my-5'>
                <form onSubmit={onSubmit} className='mt-5'>

                    <div className='group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            value={submitForm.email}
                            autoComplete='email'
                            onChange={handleOnChange} />
                    </div>

                    <div className='group'>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type={passwordSee}
                            name='password'
                            id='password'
                            value={submitForm.password}
                            autoComplete="new-password"
                            onChange={handleOnChange}
                        />
                        <button onClick={(e) => {
                            e.preventDefault()
                            togglePassword()
                        }}>voir</button>
                    </div>
                    <div className='group'>
                        <button>Connection</button>
                    </div>
                </form>
            </div>
        </>
    );
}
