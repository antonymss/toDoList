import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/ todolist-api";
import {taskAPI} from "../api/task-api";


export default {
    title: 'API task'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '348919a3-60d7-4413-983a-7a586223147c'
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '522b2923-7126-4cfe-b73b-c9aedd371a35'
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '522b2923-7126-4cfe-b73b-c9aedd371a35'

        taskAPI.createTask(todolistId, "NNewTask")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)

            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>
        {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=>
        {setTaskId(e.currentTarget.value)}}/>
        <button onClick={deleteTask}>delete task</button>

    </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')

    const updateTaskTitle = () => {
        taskAPI.updateTask(todolistId, taskId, newTitle)
            .then((res) => {
                setState(res.data)
            })}
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
        <input placeholder={'newTitle'} value={newTitle} onChange={(e)=>{setNewTitle(e.currentTarget.value)}}/>
        <button onClick={updateTaskTitle}>update task title</button>
    </div>
    </div>
}
