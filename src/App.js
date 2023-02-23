import { useState, useEffect } from "react";
import {
  fetchAllTodos,
  fetchCompleteTodos,
  deleteTodos,
  addTodo,
} from "./fetchTodos";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchAllTodos()
      .then((response) => {
        return response;
      })
      .then((todos) => setTodos(todos.data))
      .catch((error) => console.log(error.response.data));
  }, []);

  const completeTodo = async (id) => {
    const data = await fetchCompleteTodos(id).then((response) => {
      return response;
    });
    console.log(data);
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data.result._id) {
          todo.complete = data.result.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await deleteTodos(id)
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error.message));
    console.log(data);
    setTodos((todos) =>
      todos.filter((todo) => todo._id !== data.result.removeTodo._id)
    );
    // console.log(data.result);
    return todos;
  };

  const addNewTodo = async () => {
    const param = newTodo;

    const data = await addTodo(param).then((response) => {
      // console.log(response);
      return response;
    });
    setTodos([...todos, data.result]);

    setPopupActive(false);
    setNewTodo("");
  };

  return (
    <>
      <div className="App">
        <h1> Welcome! </h1>
        <h4> Your Tasks: </h4>

        <ul className="todos">
          {todos.map((todo, index) => (
            <li
              key={index}
              // eslint-disable-next-line no-useless-concat
              className={"todo" + " " + (todo.complete ? "is-complete" : "")}
            >
              <div className="leftBox" onClick={() => completeTodo(todo._id)}>
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
              </div>

              <div className="rightBox">
                <button
                  className="button-delete"
                  onClick={() => deleteTodo(todo._id)}
                  type="button"
                >
                  <IconContext.Provider value={{ className: "delete-todo" }}>
                    <AiFillCloseCircle />
                  </IconContext.Provider>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="addPopup" onClick={() => setPopupActive(true)}>
          +
        </div>
        {popupActive ? (
          <div className="popup">
            <button
              type="button"
              className="closePopup"
              onClick={() => setPopupActive(false)}
            >
              <IconContext.Provider value={{ className: "closePopup" }}>
                <AiFillCloseCircle />
              </IconContext.Provider>
            </button>
            <div className="content">
              {" "}
              <h3> Add Task</h3>
              <input
                type="text"
                className="add-todo-input"
                onChange={(event) => setNewTodo(event.target.value)}
                value={newTodo}
              />
              <button className="button" onClick={addNewTodo}>
                {" "}
                Create Task
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
