import axios from 'axios'
const request = axios.create({
    timeout: 30000,
    baseURL: 'http://localhost:3002/'
})

export function getKnights(filter: string | undefined) {
    return new Promise((resolve, reject) => {
        request.get(`/knights${filter ? '?filter=heroes':''}`)
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

export function editNickname(nickName:string, id:string) {
    return new Promise((resolve, reject) => {
        request.put(`/knights/${id}`, { nickname: nickName })
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

export function deleteKnight(id:string) {
    return new Promise((resolve, reject) => {
        request.delete(`/knights/${id}`)
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}

export function register(data:any) {
    return new Promise((resolve, reject) => {
        request.post(`/knights`, data)
        .then(result => resolve(result))
        .catch(error => reject(error))
    })
}


