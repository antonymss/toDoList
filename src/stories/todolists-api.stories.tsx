import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/ todolist-api";

export default {
    title: 'API todo'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '348919a3-60d7-4413-983a-7a586223147c'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

const createTodolist = () => {
    todolistAPI.createTodolist(title)
        .then( (res) => {
            setState(res.data);
        } )}
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'task'} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={createTodolist}>create todolist</button>
    </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

const deleteTodolist= ()=>{
    todolistAPI.deleteTodolist(todolistId)

        .then( (res) => {
            setState(res.data);
        })
}

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{ setTodolistId(e.currentTarget.value)}}/>
        <button onClick={deleteTodolist} >delete todolist</button>
    </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

const updateTodolistTitle= () => {

    todolistAPI.updateTodolist(todolistId,  title)
        .then((res) => {
            setState(res.data)
        })}

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={updateTodolistTitle}>update title todolist</button>
    </div>
    </div>
}
