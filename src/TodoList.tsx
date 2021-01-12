import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListID: string) => void
}

export function TodoList(props: PropsType) {
    // const [title, setTitle] = useState<string>('')
    // const [error, setError] = useState<string | null>(null)
    //
    // const addTask = () => {
    //     const taskTitle = title.trim()
    //     if (taskTitle) {
    //         props.addTask(taskTitle, props.id)
    //
    //     } else {
    //         setError('Title is required')
    //     }
    //     setTitle('')
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') addTask()
    // }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={title}*/}
            {/*        // e.currentTarget == input*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        onKeyPress={onKeyPressHandler}*/}
            {/*        className={error ? 'error' : ''}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div className={"error-message"}>{error}</div>}*/}
            {/*</div>*/}
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        const changeTittle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return (
                            <li key={task.id}
                                className={task.isDone ? 'is-done' : ''}>

                                <input
                                    onChange={changeStatus}
                                    type="checkbox"
                                    checked={task.isDone}/>
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan title={task.title} changeTitle={changeTittle}/>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}