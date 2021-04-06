import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '348919a3-60d7-4413-983a-7a586223147c'
    }
})



export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}`, {title})

    },
    getTodolists() {
        return instance.get('/todo-lists')

    },
    createTodolist(title: string) {
        return instance.post('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/todo-lists/${todolistId}`)
    }
}

