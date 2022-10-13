import { useEffect, useState } from "react";
import Task from "../Task/Task";

export default function TaskList(props) {
  const [currList, setCurrList] = useState([]);
  const [title, setTitle] = useState("");
  const [inEditMode, setInEditMode] = useState(false);

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

  const addNewTask = () => {
    if (title !== "") {
      const tasks = JSON.parse(localStorage.getItem("task")) || [];
      const newTask = {
        id: new Date().getTime(),
        title: title,
        done: false,
      };
      tasks.push(newTask);
      localStorage.setItem("task", JSON.stringify(tasks));
      setTitle("");
      props.get();
    }

    props.add.setAdd(false);
  };

  useEffect(() => {
    setTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tasks, props.tab]);

  return (
    <div className={`h-screen w-full p-8 overflow-y-auto flex flex-col`}>
      {currList.length > 0 ? (
        <>
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
                mode={setInEditMode}
              >
                {task.title}
              </Task>
            ))}
        </>
      ) : null}

      {(props.tab === 0 || props.tab === 1) && props.add.add && (
        <div className="flex items-center w-full">
          <div className="cursor-pointer border-2 rounded-full w-7 h-7 border-gray-400 flex items-center justify-center"></div>
          <input
            type="text"
            className="ml-2 text-3xl text-gray-400 outline-none text w-full "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={addNewTask}
            autoFocus
            placeholder="Add new task"
          />
        </div>
      )}
      {!props.add.add && !inEditMode && (
        <div
          ref={props.bottom}
          className="flex-grow"
          onClick={() => props.add.setAdd(true)}
        ></div>
      )}
    </div>
  );
}
