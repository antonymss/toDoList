import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
                // variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={'Title'}
            />
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton color={"primary"} onClick={addItem}><AddBox/></IconButton>
                {/*<button onClick={addItem}>+</button>*/}
                {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>

)
}

export default AddItemForm