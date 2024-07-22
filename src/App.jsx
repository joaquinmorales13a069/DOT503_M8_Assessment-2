import { useState, useEffect } from "react";
import { TaskColumn } from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";

// import images
import Todo from "./assets/direct-hit.png";
import Doing from "./assets/glowing-star.png";
import Done from "./assets/check-mark-button.png";

const oldTasks1 = localStorage.getItem("tasks")

function App() {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks1) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])


  function handleDelete(taskIndex) {
    const newTasks = tasks.filter((task, index) => {
      index !== taskIndex;
    });
    setTasks(newTasks);
  }

  return (
    <div className=" app">
      <TaskForm setTask={setTasks} />
      <main className=" flex justify-evenly py-[20px] px-[8%] ">
        <TaskColumn
          columnName="To Do"
          icon={Todo}
          tasks={tasks}
          status={"todo"}
          handleDelete={handleDelete}
        ></TaskColumn>
        <TaskColumn
          columnName="Doing"
          icon={Doing}
          tasks={tasks}
          status={"Doing"}
          handleDelete={handleDelete}
        ></TaskColumn>
        <TaskColumn
          columnName="Done"
          icon={Done}
          tasks={tasks}
          status={"Done"}
          handleDelete={handleDelete}
        ></TaskColumn>
      </main>
    </div>
  );
}

export default App;
