import { read, write, keys } from './storage'

export function getCurrentUser() {
    return read(keys.kSession, null)
}

export async function authLogin(email, password) {
    const users = read(keys.kUsers, [])
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase())
    if (!u) {
        const err = new Error('Email is not registered')
        err.code = 'EMAIL_NOT_FOUND'
        throw err
    }
    if (u.password !== password) {
        const err = new Error('Incorrect password')
        err.code = 'WRONG_PASSWORD'
        throw err
    }
    write(keys.kSession, { id: u.id, name: u.name, email: u.email })
    return read(keys.kSession, null)
}

export async function authRegister({ name, email, password }) {
    const users = read(keys.kUsers, [])
    if (users.some(x => x.email.toLowerCase() === email.toLowerCase())) {
        const err = new Error('Email is already registered')
        err.code = 'EMAIL_EXISTS'
        throw err
    }
    const u = { id: crypto.randomUUID(), name, email, password }
    users.push(u)
    write(keys.kUsers, users)
    write(keys.kSession, { id: u.id, name: u.name, email: u.email })
    return read(keys.kSession, null)
}

export function authLogout() {
    write(keys.kSession, null)
}
