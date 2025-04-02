import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

   

    let isAuthenticatedInitialState = sessionStorage.getItem('authorization_token')

    const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticatedInitialState)
    
    useEffect(
        () => {
            const token = sessionStorage.getItem('authorization_token')
            if (token) {
                setIsAuthenticatedState(true)
            }
        },
        []
    )

    const logout = () => {
        sessionStorage.removeItem('authorization_token')
        setIsAuthenticatedState(false)

    }

    const login = (authorization_token) => {
        sessionStorage.setItem('authorization_token', authorization_token)
        setIsAuthenticatedState(true)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticatedState, logout, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider