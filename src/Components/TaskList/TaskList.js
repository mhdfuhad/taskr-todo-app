import { useEffect, useState } from "react";
import Task from "../Task/Task";

export default function TaskList(props) {
  const [currList, setCurrList] = useState([]);

  const setTasks = () => {
    if (props.tasks) {
      if (props.tab === 0) {
        setCurrList(props.tasks);
      } else if (props.tab === 1) {
        setCurrList(props.tasks.filter((task) => !task.done));
      } else {
        setCurrList(props.tasks.filter((task) => task.done));
      }
    }
  };

  const updateTaskStatus = (idx) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex((task) => task.id === idx);
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("task", JSON.stringify(tasks));
    props.get();
  };

  const updateTaskContent = (idx, title) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex((task) => task.id === idx);
    tasks[index].title = title;
    localStorage.setItem("task", JSON.stringify(tasks));
    props.get();
  };

  const deleteSingleTask = (idx) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const newTasks = tasks.filter((task) => task.id !== idx);
    localStorage.setItem("task", JSON.stringify(newTasks));
    props.get();
  };

  useEffect(() => {
    setTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tasks, props.tab]);

  return currList.length > 0 ? (
    <div className={`h-screen w-full p-8 overflow-y-scroll `}>
      {currList &&
        currList.map((task, idx) => (
          <Task
            key={idx}
            id={task.id}
            tab={props.tab}
            checked={task.done}
            update={updateTaskStatus}
            contentUpdate={updateTaskContent}
            delete={deleteSingleTask}
          >
            {task.title}
          </Task>
        ))}
      <div ref={props.bottom}></div>
    </div>
  ) : (
    <></>
  );
}
