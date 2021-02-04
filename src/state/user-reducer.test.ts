import {userReducer, UserType} from "./user-reducer";

test('increment age', ()=>{
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount:3
    }

    const endUser = userReducer(startUser, {type: 'INCREMENT-AGE'})
    expect(endUser.age).toBe(30)
})
test('increment children count', ()=>{
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount:3
    }

    const endUser = userReducer(startUser, {type: 'Increment-children-count'})
    expect(endUser.childrenCount).toBe(4)
})
test('change user name', ()=>{
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount:3
    }

    const endUser = userReducer(startUser, {type: 'Change-name', newName: 'bob'})
    expect(endUser.name).toBe('bob')
})