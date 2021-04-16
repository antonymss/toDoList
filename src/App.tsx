import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    setTodosTC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskTC, changeTaskTitleTC, removeTaskTC, updateTaskStatusTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/task-api";

// export type  TaskType = {
//     id: string
//     title: string
//     isDone: boolean
//
// }
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
function App() {

    useEffect(() => {
dispatch(setTodosTC())

    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(taskID,todoListID))
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        const action = ChangeTodolistFilterAC(todoListID, filterValue)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((newTaskTitle: string, todoListID: string) => {

        dispatch(addTaskTC(todoListID,newTaskTitle ))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {


        dispatch(updateTaskStatusTC(taskID, status, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        // const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(changeTaskTitleTC(taskID, {title}, todoListID))
    }, [dispatch])

    const removeTodolist = useCallback((todoListID: string) => {
        // const action = RemoveTodolistAC(todoListID)
        dispatch(removeTodolistTC(todoListID))

    }, [dispatch])

    const addTodolist = useCallback((todolistTitle: string) => {

        dispatch(addTodolistTC(todolistTitle))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        // const action = ChangeTodolistTitleAC(title, todoListID)
        dispatch(changeTodolistTitleTC(title,todoListID))
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

export default App;

