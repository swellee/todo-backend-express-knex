import React from "react"
import { Link } from "react-router"
import { router_todo_detail } from "../consts"
import "./todo-item.css"
export const TodoItem = ({todo})=>{
    return <li className="todo-item">
        <span className="order">{todo.order}</span>
        <span className="title">{todo.title}</span>
        <span className="completed">{todo.completed ? "completed" : "pending"}</span>
        <span className="actions">
            <Link to={router_todo_detail.replace(':id', todo.id)}>edit</Link>
            <button>delete</button>
        </span>
    </li>
}