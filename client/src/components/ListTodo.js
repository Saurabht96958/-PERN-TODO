import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  //deleting todo

  const deleteTodo = async(id) => {
      const response = await fetch(`http://localhost:5000/todos/${id}`,{
          method: "DELETE"
      })
    // console.log(response);
    setTodos(todos.filter(todo => todo.todo_id !== id));
  }

  const getTodos = async () => {
    try {

      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      console.log(jsonData);
      setTodos(jsonData);

    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  },[]);
//   console.log(todos);

  return (
    <Fragment>
      <table className="table text-center mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
          {todos.map(todo => (
              <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td><EditTodo todo={todo}/></td>
                  <td>
                      <button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
                  </td>
              </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
