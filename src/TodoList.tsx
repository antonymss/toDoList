import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";

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
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export function TodoList(props: PropsType) {

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
    const ChangeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }
    return (
        <div>
            <h3 style={{textAlign: "center"}}>
                <EditableSpan title={props.title} changeTitle={ChangeTodolistTitle}/>
                {/*<button onClick={removeTodolist}>x</button>*/}
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", paddingLeft: '0px'}}>
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
                                <Checkbox
                                    color={"primary"}
                                    onChange={changeStatus}
                                    checked={task.isDone}
                                />
                                {/*<input*/}
                                {/*    onChange={changeStatus}*/}
                                {/*    type="checkbox"*/}
                                {/*    checked={task.isDone}/>*/}
                                {/*<span>{task.title}</span>*/}
                                <EditableSpan title={task.title} changeTitle={changeTittle}/>
                                <IconButton onClick={removeTask}><Delete/></IconButton>
                                {/*<button onClick={removeTask}>x</button>*/}
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <Button
                    style={{marginRight: '3px'}}
                    size={"small"}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={"primary"}
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{marginRight: '3px'}}
                    size={"small"}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={"primary"}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={"primary"}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}