let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let saveRefreshToken = (refresh_token) => {
    localStorage.setItem('refreshToken', refresh_token)
}


let logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')

}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const authFunctions = { saveToken, logout, isLogged, saveRefreshToken }