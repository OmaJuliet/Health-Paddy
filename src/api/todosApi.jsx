//CRUD METHODS WITH AXIOS
import axios from "axios"

const todosApi = axios.create({
    //where we'll run our json server instance
    baseURL: "http://localhost:3500"
})

// To get/read the json todo data
export const getTodos = async () => {
    //request all of the todos available in the todoApi we created earlier. use the get method
    const response = await todosApi.get("/todos")

    //return the response data gotten from axios
    return response.data
}

//create the create method to adding/creating todos
export const addTodo = async(todo) => {
    return await todosApi.post("/todos", todo)
}

//Using the patch method to update todos
export const updateTodo = async(todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}

//using the delete method to delete todos
export const deleteTodo = async(todo) => {
    return await todosApi.delete(`/todos/${todo.id}`, todo)
}


export default todosApi