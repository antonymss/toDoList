import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {RequestStatusType} from "../../app-reducer";

export type AddItemFormType = {
    addItem: (title: string) => void
    entityStatus?: RequestStatusType
}

const AddItemForm = React.memo((props: AddItemFormType) => {

    console.log('AddItemForm called')

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter') addItem()
    }
    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItem(itemTitle)

        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    return (
        <div>
            <TextField

                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={'Title'}
                disabled={props.entityStatus === 'loading'}
            />

            <IconButton color={"primary"} onClick={addItem} disabled={props.entityStatus === 'loading'}>
                <AddBox/></IconButton>

        </div>

    )
})

export default AddItemForm