import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoistsActionType} from "./todolists-reducer";
import {TodolistType} from "../api/ todolist-api";


export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoistsActionType

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todolistID: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistID: string
    isDone: boolean
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    tskID: string
    todolistID: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string

}

const initialState: TaskStateType = {}

export function tasksReducer(state: TaskStateType = initialState, action: ActionsType) {
    switch (action.type) {
        case "SET-TODOS":{
            debugger
            let copyState = {...state}
            action.todos.forEach((tl)=>{
                debugger
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(task => task.id !== action.tskID)

            return copyState
        }


        case 'ADD-TASK': {
            let task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id !== action.taskID) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id !== action.taskID) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', tskID: taskID, todolistID: todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}
