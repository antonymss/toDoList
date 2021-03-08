import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>

    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('Todolist called')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const ChangeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3 style={{textAlign: "center"}}>
                <EditableSpan title={props.title} changeTitle={ChangeTodolistTitle}/>

                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", paddingLeft: '0px'}}>
                {
                    tasksForTodoList.map(task => <Task
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        task={task}
                        todolistId={props.id}
                        key={task.id}
                    />)
                }

            </ul>
            <div>
                <Button
                    style={{marginRight: '3px'}}
                    size={"small"}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={"primary"}

                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{marginRight: '3px'}}
                    size={"small"}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={"primary"}

                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={"primary"}

                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

