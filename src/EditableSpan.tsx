import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        editMode
            ?<TextField value={title} onBlur={offEditMode} autoFocus onChange={changeTitle}/>
            // ? <input onBlur={offEditMode} autoFocus value={title} onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}