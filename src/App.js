import { useEffect, useState, useRef } from "react";
import Tabs from "./Components/Tabs/Tabs";
import TaskList from "./Components/TaskList/TaskList";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState(null);
  const scrollRef = useRef();

  const getTasks = () => {
    setTasks(JSON.parse(localStorage.getItem("task")));
  };

  const deleteTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const newTasks = tasks.filter((task) => !task.done);
    localStorage.setItem("task", JSON.stringify(newTasks));
    getTasks();
  };

  const addTask = () => {
    scrollRef.current?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getTasks();
  }, [activeTab]);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <Tabs
        tab={{ activeTab, setActiveTab }}
        add={addTask}
        deleteAll={deleteTasks}
      />
      <TaskList
        tasks={tasks}
        tab={activeTab}
        get={getTasks}
        bottom={scrollRef}
      />
    </div>
  );
}

export default App;
