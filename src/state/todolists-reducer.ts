import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from "../api/ todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from "../app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoistsActionType
    | setAppStatusType
    | setAppErrorType
    | ChangeTodoistEntityStatusActionType

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.todos.map((tl) => {
                return {...tl, filter: 'all', entityStatus: "idle"}
            })
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all", entityStatus: "idle"}]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        case "TODOLISTS/CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}
export const setTodolistsAC = (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'TODOLISTS/CHANGE_TODOLIST_ENTITY_STATUS', id, entityStatus
} as const)

export type SetTodoistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodoistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            // let todos = res.data
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))

        })
}
export const removeTodolistTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todoListID, 'loading'))
        todolistAPI.deleteTodolist(todoListID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(RemoveTodolistAC(todoListID))
                    dispatch(setAppStatusAC('succeeded'))
                } else{
                    dispatch(setAppErrorAC('error'))
                    dispatch(setAppStatusAC('failed'))
                }
            })

    }

}
export const addTodolistTC = (todolistTitle: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(todolistTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(AddTodolistAC(todolistTitle))
            } else {
                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setAppErrorAC('error'))
                // }
                // dispatch(setAppStatusAC('failed'))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err:AxiosError)=>{
            // dispatch(setAppErrorAC(err.message))
            // dispatch(setAppStatusAC('failed'))
            handleServerNetworkError(err.message, dispatch)
        })
}
export const changeTodolistTitleTC = (title: string, todoListID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(title, todoListID)
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(ChangeTodolistTitleAC(todoListID, title))
        })
}