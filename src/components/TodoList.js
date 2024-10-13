import React, { memo } from "react"
import Todo from "./Todo"

const TodoList = memo(props => {
    const { todosList, isCheckedAll, checkedAllTodos } = props
    return (
        <section className="main">
            <input 
                className="toggle-all" 
                type="checkbox"
                checked={isCheckedAll}
                
            />
            <label htmlFor="toggle-all" onClick={checkedAllTodos}></label>
            <ul className="todo-list">
                {
                    todosList.map((todo, index) => (
                        <Todo key={`todo${todo.id}`} todo={todo} {...props} index={index}/>
                    ))
                }
            </ul>
        </section>
    )
})

export default TodoList