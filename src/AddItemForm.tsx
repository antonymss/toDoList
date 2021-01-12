import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props:AddItemFormType) {
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
            <input
                value={title}
                // e.currentTarget == input
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>

    )
}

export default AddItemForm