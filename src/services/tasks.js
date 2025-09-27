import dayjs from 'dayjs'
import { read, write, keys, uid } from './storage'


export function listTasks(ownerEmail) {
    const all = read(keys.kTasks, [])
    return all.filter(t => t.ownerEmail === ownerEmail)
}


export function createTask(ownerEmail, data) {
    const all = read(keys.kTasks, [])
    const t = { id: uid('t_'), ownerEmail, title: data.title, description: data.description || '', dueDate: data.dueDate, status: data.status || 'pending', createdAt: dayjs().toISOString() }
    all.push(t)
    write(keys.kTasks, all)
    return t
}


export function updateTask(ownerEmail, id, data) {
    const all = read(keys.kTasks, [])
    const i = all.findIndex(x => x.id === id && x.ownerEmail === ownerEmail)
    if (i === -1) throw new Error('Not found')
    all[i] = { ...all[i], ...data }
    write(keys.kTasks, all)
    return all[i]
}


export function removeTask(ownerEmail, id) {
    const all = read(keys.kTasks, [])
    const next = all.filter(x => !(x.id === id && x.ownerEmail === ownerEmail))
    write(keys.kTasks, next)
}