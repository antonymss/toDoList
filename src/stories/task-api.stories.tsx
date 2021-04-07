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
        const todolistId = '89a36fd1-075c-49d0-961e-f9da86e970fd'
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
        const todolistId = '89a36fd1-075c-49d0-961e-f9da86e970fd'

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
    useEffect(() => {
        const taskId = 'd6aab0eb-0479-444b-84bb-044cd145d52d'
        const todolistId = '89a36fd1-075c-49d0-961e-f9da86e970fd'
        taskAPI.updateTask(todolistId, taskId, 'REACT>>>>>>>>>')
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
