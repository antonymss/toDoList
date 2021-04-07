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
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})

    },
    getTodolists() {
        return instance.get<Array<TodolistType>>('/todo-lists')

    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D={}> = {
    resultCode: number
    fieldsError: string[]
    messages: Array<string>
    data: D
}



