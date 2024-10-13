import React, { memo } from "react"

const Footer = memo(props => {
    const { setStatusFilter, status, numOfTodo, numOfTodoLeft, clearCompleted } = props
    const filterBtns = [{
        title: 'All',
        isActived: status === 'ALL',
        onClick: () => setStatusFilter('ALL'),
        link: ''
    }, {
        title: 'Active',
        isActived: status === 'ACTIVE',
        onClick: () => setStatusFilter('ACTIVE'),
        link: 'active'
    }, {
        title: 'Completed',
        isActived: status === 'COMPLETED',
        onClick: () => setStatusFilter('COMPLETED'),
        link: 'completed'
    }]
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numOfTodoLeft}</strong>
                <span> </span>
                <span>{numOfTodoLeft <= 1 ? 'item' : 'items'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {
                    filterBtns.map(btn => (
                        <FilterBtn key={`btn${btn.title}`} {...btn}/>
                    ))
                }
            </ul>
            {numOfTodo > numOfTodoLeft && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>}
        </footer>
    )
})

const FilterBtn = memo(props => {
    const { title, isActived, onClick, link } = props
    return (
        <>
            <li>
                <a
                    href={`#/${link}`}
                    className={`${isActived ? 'selected' : ''}`}
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
            <span></span>
        </>
    )
})

export default Footer