import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authLogin, authLogout, authRegister, getCurrentUser } from '../services/auth'


const AuthContext = createContext(null)


export function AuthProvider({ children }) {
    const [user, setUser] = useState(getCurrentUser())


    const login = async (email, password) => {
        const u = await authLogin(email, password)
        setUser(u)
        return u
    }


    const register = async (data) => {
        const u = await authRegister(data)
        setUser(u)
        return u
    }


    const logout = () => {
        authLogout()
        setUser(null)
    }


    const value = useMemo(() => ({ user, login, logout, register }), [user])


    useEffect(() => { }, [])


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export function useAuth() { return useContext(AuthContext) }