import React, {useReducer, useState} from 'react';
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
function AppWithReducers() {

    const todoListID1 = v1()
    const todoListI2 = v1()

    const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer,[
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListI2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
            [todoListID1]: [
                {id: v1(), title: 'AAA', isDone: false},
                {id: v1(), title: 'BBB', isDone: true},
                {id: v1(), title: 'CCC', isDone: false},
            ],
            [todoListI2]: [
                {id: v1(), title: 'III', isDone: true},
                {id: v1(), title: 'EEE', isDone: false},
                {id: v1(), title: 'FFF', isDone: true},]
        }
    )

    function removeTask(taskID: string, todoListID: string) {
        const action = removeTaskAC(taskID,todoListID)
        dispatchToTasks(action)
    }

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const action = ChangeTodolistFilterAC(todoListID,filterValue)
        dispatchToTodolist(action)
    }

    function addTask(newTaskTitle: string, todoListID: string) {
        const action = addTaskAC(newTaskTitle,todoListID)
        dispatchToTasks(action)
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID,isDone,todoListID)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID,title,todoListID)
        dispatchToTasks(action)
    }

    function removeTodolist(todoListID: string) {
        const action = RemoveTodolistAC(todoListID)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    function addTodolist(todolistTitle: string) {
        const action = AddTodolistAC(todolistTitle)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        const action = ChangeTodolistTitleAC(title,todoListID)
        dispatchToTodolist(action)
    }

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
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
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
                                            changeStatus={changeStatus}
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

export default AppWithReducers;

