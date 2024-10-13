import React, { useState, useEffect } from 'react'
import './App.css'
import './css/Todo.css'
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)

const filterByStatus = (todos = [], status = '', id = '') => {
    switch (status) {
        case 'ACTIVE':
            return todos.filter(todo => !todo.isCompleted)
        case 'COMPLETED':
            return todos.filter(todo => todo.isCompleted)
        case 'REMOVE':
            return todos.filter(todo => todo.id !== id)
        default:
            return todos
    }
}

const App = () => {
    const [todosList, setTodosList] = useState([
        { id: 1, text: 'todo 1', isCompleted: true },
        { id: 2, text: 'todo 2', isCompleted: false }
    ])
    const [todoEditingId, setTodoEditingId] = useState('')
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [status, setStatus] = useState('ALL')

    useEffect(() => {
        setIsCheckedAll(!isNotCheckedAll(todosList))
    }, [todosList])

    const addTodo = (todo = {}) => {
        setTodosList(prevTodosList => [...prevTodosList, todo])
    }

    const onEditTodo = (todo = {}, index = -1) => {
        if (index >= 0) {
            const newTodosList = [...todosList]
            newTodosList.splice(index, 1, todo)
            setTodosList(newTodosList)
            setTodoEditingId('')
        }
    }

    const markCompleted = (id = '') => {
        const updatedList = todosList.map(todo => 
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
        setTodosList(updatedList)
        setIsCheckedAll(!isNotCheckedAll(updatedList))
    }

    const checkedAllTodos = () => {
        const updatedList = todosList.map(todo => ({
            ...todo,
            isCompleted: !isCheckedAll
        }))
        setTodosList(updatedList)
        setIsCheckedAll(!isCheckedAll)
    }

    const clearCompleted = () => {
        setTodosList(filterByStatus(todosList, 'ACTIVE'))
    }

    const removeTodo = (id = '') => {
        setTodosList(filterByStatus(todosList, 'REMOVE', id))
    }

    return (
        <div className="todoapp">
            <Header addTodo={addTodo} />
            <TodoList 
                todosList={filterByStatus(todosList, status)}
                getTodoEditingId={setTodoEditingId}
                todoEditingId={todoEditingId}
                onEditTodo={onEditTodo}
                markCompleted={markCompleted}
                isCheckedAll={isCheckedAll}
                checkedAllTodos={checkedAllTodos}
                removeTodo={removeTodo}
            />
            <Footer 
                setStatusFilter={setStatus}
                status={status}
                clearCompleted={clearCompleted}
                numOfTodo={todosList.length}
                numOfTodoLeft={filterByStatus(todosList, 'ACTIVE').length}
            />
        </div>
    )
}

export default App
