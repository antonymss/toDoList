
import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '348919a3-60d7-4413-983a-7a586223147c'
    }
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    }
}

