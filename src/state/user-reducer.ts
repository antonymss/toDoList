export type UserType = {
    name: string
    age: number
    childrenCount: number
}

type ActionType = {
    type: string
    [key: string]: any
}

// function incAge(user: UserType) {
//     return {...user, age: user.age + 1}
// }
//
// function incChildren(user: UserType) {
//     return {...user, childrenCount: user.childrenCount + 1}
// }
//
// function changeName(user: UserType, newName: string) {
//     return {...user, name: newName}
// }

export function userReducer(user: UserType, action: ActionType) {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...user, age: user.age + 1}
        case 'Increment-children-count':
            return {...user, childrenCount: user.childrenCount + 1}
        case 'Change-name':
            return {...user, name: action.newName}

        default:
            return user
    }
}