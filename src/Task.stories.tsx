import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";


export default {
    title: 'Todolist/Task',
    component: Task
} as Meta;

const removeTaskCallback = action('Remove Button inside Tssk clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTittleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus:changeStatusCallback,
    removeTask: removeTaskCallback,
    changeTittle: changeTittleCallback
}
export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'

}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todolistId: 'todolistId1'
}

