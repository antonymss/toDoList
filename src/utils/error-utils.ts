import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from "../app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/ todolist-api";

export const handleServerNetworkError = (message: string, dispatch: Dispatch<ErrorUtilsActionType>) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}
export const handleServerAppError=<D>(data: ResponseType<D>,dispatch: Dispatch<ErrorUtilsActionType>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('error'))
    }
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsActionType = setAppStatusType | setAppErrorType