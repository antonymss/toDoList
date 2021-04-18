import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from "../api/ todolist-api";
import {Dispatch} from "redux";

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

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | SetTodoistsActionType

const initialState: Array<TodoListType> = []

export type TodolistDomainType = TodoListType & { filter: FilterValuesType }

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.todos.map((tl)=> {
                return {...tl, filter: 'all'}
            })
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
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
export type SetTodoistsActionType = ReturnType<typeof setTodolistsAC>

export const setTodosTC=()=> (dispatch: Dispatch)=>{
    todolistAPI.getTodolists()
        .then((res) => {
            // let todos = res.data
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC=(todoListID: string)=>(dispatch: Dispatch)=>{
    todolistAPI.deleteTodolist(todoListID)
        .then((res)=>{
            dispatch(RemoveTodolistAC(todoListID))
        })
}
export const addTodolistTC=(todolistTitle: string)=>(dispatch:Dispatch)=>{
    todolistAPI.createTodolist(todolistTitle)
        .then((res)=>{
            dispatch(AddTodolistAC(todolistTitle))
        })
}
export const changeTodolistTitleTC=(title: string, todoListID: string)=>(dispatch:Dispatch)=>{
    debugger
    todolistAPI.updateTodolist(title, todoListID )
        .then((res)=>{
            debugger
        dispatch(ChangeTodolistTitleAC(todoListID,title))
    })
}