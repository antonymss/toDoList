import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setAppErrorAC} from "../../app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    // const [open, setOpen] = React.useState(true)
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        // setOpen(false)
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error != null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
