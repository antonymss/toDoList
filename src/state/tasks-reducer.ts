import {TaskStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoistsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from "../app-reducer";


export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoistsActionType
    | SetTasksActionType
    | setAppStatusType
    | setAppErrorType

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todolistID: string
    model: UpdateTaskModelType
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    todolistID: string
    status: TaskStatuses
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    tskID: string
    todolistID: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType

}
type SetTasksActionType = ReturnType<typeof setTasksAC>

const initialState: TaskStateType = {}

export function tasksReducer(state: TaskStateType = initialState, action: ActionsType): TaskStateType {
    switch (action.type) {
        case "SET-TODOS": {
            let copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(task => task.id !== action.tskID)

            return copyState
        }


        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todolistID];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskID ? {...t, status: action.status} : t);

            state[action.todolistID] = newTasksArray;
            return ({...state});
        }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks.map(t => ({...t, isDone: false}))
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', tskID: taskID, todolistID: todolistID}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, status, todolistID}
}
export const changeTaskTitleAC = (taskID: string, model: UpdateTaskModelType, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, model, todolistID}
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                const tasks = res.data.items
                const action = setTasksAC(todolistId, tasks)
                dispatch(action)

            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
        })
}
export const addTaskTC = (todoListID: string, newTaskTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.createTask(todoListID, newTaskTitle)
        .then((res) => {
            if (res.data.resultCode === 0){
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            }else{
                if
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
}
export const changeTaskTitleTC = (taskID: string, model: UpdateDomainTaskModelType, todoListID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todoListID].find(t => t.id === taskID)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        status: task.status,
        startDate: task.startDate,
        title: task.title,
        ...model
    }
    dispatch(setAppStatusAC('loading'))
    taskAPI.updateTask(todoListID, taskID, apiModel)
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTaskTitleAC(taskID, apiModel, todoListID))
        })
}

export const updateTaskStatusTC = (taskID: string, status: TaskStatuses, todoListID: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        debugger
        const state = getState()
        const tasks = state.tasks
        const tasksForCurrentTodolist = tasks[todoListID]

        const currentTask = tasksForCurrentTodolist.find((el) => {
            return el.id === taskID
        })
        dispatch(setAppStatusAC('loading'))
        if (currentTask) {
            taskAPI.updateTask(todoListID, taskID, {
                status,
                title: currentTask.title,
                startDate: currentTask.startDate,
                priority: currentTask.priority,
                description: currentTask.description,
                deadline: currentTask.deadline
            })

                .then((res) => {
                    dispatch(setAppStatusAC('succeeded'))
                    const action = changeTaskStatusAC(taskID, status, todoListID)
                    dispatch(action)
                })
        }

    }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}