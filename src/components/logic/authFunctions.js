const saveToken = (token) => {
    localStorage.setItem('token', token)
}

const saveRefreshToken = (refresh_token) => {
    localStorage.setItem('refreshToken', refresh_token)
}


const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')

}

const isLogged = () => {
    const token = localStorage.getItem('token')
    return !!token
}

const getToken = () => {
    return localStorage.getItem('token')
}

export const authFunctions = { 
    saveToken, 
    logout, 
    isLogged, 
    saveRefreshToken, 
    getToken 
}