import axios from "axios";

// fetch all todos
async function fetchAllTodos() {
  const response = await axios.get(
    `https://todos-list-rdto.onrender.com/todos/`
  );
  // console.log(response.data);
  return response.data;
}
export { fetchAllTodos };

// fetchCompleteTodos
async function fetchCompleteTodos(id) {
  const response = await axios.put(
    `https://todos-list-rdto.onrender.com/todos/${id}/complete`
  );
  // console.log(response.data);
  return response.data;
}
export { fetchCompleteTodos };

// deleteTodos
async function deleteTodos(id) {
  const response = await axios.delete(
    `https://todos-list-rdto.onrender.com/todos/${id}`
  );
  //   console.log(response.data);
  return response.data;
}
export { deleteTodos };

// addTodo
async function addTodo(param) {
  //   const response = await axios.post(`http://localhost:3001/todos/new`, param);
  const response = await axios({
    method: "post",
    url: `https://todos-list-rdto.onrender.com/todos/new`,
    data: {
      text: param,
    },
  });
  // console.log(response.data);
  return response.data;
}
export { addTodo };
