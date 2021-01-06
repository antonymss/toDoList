import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean

}
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TaskStateType = {
    [key: string]: Array<TaskType>

}

//BLL
function App() {

    const todoListID1 = v1()
    const todoListI2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to lern', filter: 'all'},
        {id: todoListI2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(newTaskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeTodolist(todoListID: string) {
        setTodoLists(todoLists.filter(tl=> tl.id !== todoListID))
        delete tasks[todoListID]
    }

// UI
    return (
        <div className="App">
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
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

