const kUsers = 'rtm_users'
const kSession = 'rtm_session'
const kTasks = 'rtm_tasks'


export function read(key, fallback) {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
}


export function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


export function uid(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(4)
}


export const keys = { kUsers, kSession, kTasks }