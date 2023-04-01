import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [Screen, setScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDes, setNewDes] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  function handleAddTodo() {
    const newTodoItem = {
      title: newTitle,
      description: newDes,
    };
    const updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  }
  function handleDeleteTodo(index) {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }
  function handleComplete(index) {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  }

  function handleDeleteCompletedTodo(index) {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    const savedCompletdTodo = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletdTodo) {
      setCompletedTodos(savedCompletdTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's The Task Title?"
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={newDes}
              onChange={(e) => setNewDes(e.target.value)}
              placeholder="What's The Task Description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${Screen === false && `active`}`}
            onClick={() => setScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${Screen === true && `active`}`}
            onClick={() => setScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {Screen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete"
                    />
                  </div>
                </div>
              );
            })}

          {Screen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed On : {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
