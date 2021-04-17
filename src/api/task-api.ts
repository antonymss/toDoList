import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '348919a3-60d7-4413-983a-7a586223147c'
    }
})

export const taskAPI = {
        getTasks(todolistId: string) {
        return instance.get<GetTasksType >(`/todo-lists/${todolistId}/tasks`)

    },
    createTask(todolistId: string,title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)

    }
}
type GetTasksType = {
   items: Array<TaskType>
    totalCount: number
    error: string | null
}

export type TaskType = {
    id: string
    addedDate: string
    order: number
    title: string
    description:string
    completed:boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    todoListId: string
    isDone: boolean
}
type ResponseType<D={}> = {
    resultCode: number
    fieldsError: string[]
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}