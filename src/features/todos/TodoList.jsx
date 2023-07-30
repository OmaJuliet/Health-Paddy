import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../api/todosApi"

import { useState } from "react"

const TodoList = () => {
  const [ newTodo, setNewTodo ] = useState("")
  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    error,
    data: todos
  } = useQuery('todos', getTodos, {
    onSuccess: (data) => {
        // Sort the data by id in descending order (newest items first)
        const sortedData = data.sort((a, b) => b.id - a.id);
        return sortedData;
      },
  })

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
        queryClient.invalidateQueries("todos")
    }
  })

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
        queryClient.invalidateQueries("todos")
    }
  })

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
        queryClient.invalidateQueries("todos")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false})
    setNewTodo('')
  }

// form where new todo items are added and submitted. It's being stored in this variable "newItemSection" that will be passed on to the jsx 
  const newItemSection = (
    <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
            <input 
              type="text"
              id="new-todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter a new todo item" 
            />
        </div>
        <button className="submit">
            Add
        </button>
    </form>
  )

//   conditionally render your items based on isLoading, error and data state
  let content
  if (isLoading) {
    content = <p>Loading....</p>
  } else if (isError) {
    content = <p>{error.message}</p>
  } else {
    content = todos.map((todo) => {
        return (
            <article key={todo.id}>
                <div className="todo">
                    <input 
                      type="checkbox"
                      checked={todo.completed}
                      id={todo.id}
                      onChange={() =>
                        updateTodoMutation.mutate({ ...todo, 
                        completed: !todo.completed })
                      }
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => 
                    deleteTodoMutation.mutate({ id: todo.id })}>
                    Delete
                </button>
            </article>
        )
    })
  }

  return (
    <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main> 
  )
}

export default TodoList