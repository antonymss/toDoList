import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todolistAPI} from "./api/ todolist-api";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskStateType = {
    [key: string]: Array<TaskType>

}

//BLL
function AppWithRedux() {

    useEffect(()=>{
        debugger
        todolistAPI.getTodolists()
            .then((res)=>{
                let todos = res.data
            })
    },[])

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        const action = ChangeTodolistFilterAC(todoListID, filterValue)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((newTaskTitle: string, todoListID: string) => {
        const action = addTaskAC(newTaskTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todoListID: string) => {
        const action = RemoveTodolistAC(todoListID)
        dispatch(action)

    }, [dispatch])

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = AddTodolistAC(todolistTitle)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        const action = ChangeTodolistTitleAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

// UI
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id]
                            // if (tl.filter === 'active') {
                            //     tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            // }
                            // if (tl.filter === 'completed') {
                            //     tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            // }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{padding: '30px'}}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

