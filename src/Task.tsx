import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task =React.memo ((props: TaskPropsType) => {
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const changeTittle = useCallback( (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    },[props.changeTaskTitle,props.task.id,props.todolistId])
    return (
        <li key={props.task.id}
            className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                color={"primary"}
                onChange={changeStatus}
                checked={props.task.isDone}
            />

            <EditableSpan title={props.task.title} changeTitle={changeTittle}/>
            <IconButton onClick={removeTask}><Delete/></IconButton>

        </li>)
})