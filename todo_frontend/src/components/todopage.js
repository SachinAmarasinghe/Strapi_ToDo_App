import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../config'

const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null

const Todopage = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState(null)
    const [todo, setTodo] = useState('')
    const [todoStatus, setTodoStatus] = useState(false)

    useEffect(() => {
        getTodos()
    }, [])

    // GET ToDos 
    const getTodos = async () => {
        try {
            const { data } = await axios.get(API + "/to-dos")
            setTodos(data.data)
        } catch (err) {
            handleError(err)
        }
    }
    // POST ToDos 
    const postTodo = async (e) => {
        e.preventDefault()

        const todoPayload = {
            "data": {
                "Todo_item": todo,
                "Todo_status": todoStatus
            }
        }

        try {
            await axios.post(API + "/to-dos", todoPayload);
            setTodo('')
            setTodoStatus(false)
            getTodos()
        } catch (err) {
            handleError(err)
        }
    }

    // PUT ToDos 
    const putTodo = async (id, status) => {
        const todoPayload = {
            "data": {
                "Todo_status": status
            }
        }

        try {
            await axios.put(API + "/to-dos/" + id, todoPayload)
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, attributes: { ...todo.attributes, Todo_status: status } }
                }
                return todo
            })
            setTodos(updatedTodos)
        } catch (err) {
            handleError(err)
        }
    }

    // DELETE ToDos
    const deleteTodo = async (id) => {
        try {
            await axios.delete(API + "/to-dos/" + id)
            getTodos()
        } catch (err) {
            handleError(err)
        }
    }

    const handleError = (err) => {
        console.log(err)
        alert("An error occurred while fetching the to-dos. Please try again later.");
    }
    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }
    return (
        <div className="todo-page">
            <div className="todo-page_header">
                {user && <h1 className=" text-4xl">Welcome <span className="capitalize">{user.username}</span></h1>}
                <button className="btn btn-outline" onClick={logout}>Logout</button>
            </div>
            <div className="todo-page_content">
                <form onSubmit={postTodo} className="add-todo-form">
                    <input type="text" placeholder="What's your to-do?" value={todo} onChange={(event) => { setTodo(event.target.value) }}></input>
                    <button className="btn btn-outline" type="submit">Add todo</button>
                </form>

                <ol className='todo-list'>
                    {/* not completed todos  */}
                    {todos && todos.filter(todo => todo.attributes.Todo_status === false).map(todo => {
                        return (
                            <li key={todo.id} className='todo-list_item'>
                                <h2>{todo.attributes.Todo_item}</h2>
                                <input type="checkbox" checked={todo.attributes.Todo_status} name="status" onChange={(event) => { putTodo(todo.id, event.target.checked) }} />
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </li>
                        )
                    })}
                    {/* completed todos  */}
                    {todos && todos.filter(todo => todo.attributes.Todo_status === true).map(todo => {
                        return (
                            <li key={todo.id} className='todo-list_item'>
                                <h2>{todo.attributes.Todo_item}</h2>
                                <input type="checkbox" checked={todo.attributes.Todo_status} readOnly name="status" onChange={(event) => { putTodo(todo.id, event.target.checked) }} />
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </li>
                        )
                    })}
                </ol>
            </div>



        </div>
    )
}

export default Todopage