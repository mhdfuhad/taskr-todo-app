import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
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

  const updateTaskStatus = (id) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("task", JSON.stringify(tasks));
    props.get();
  };

  const updateTaskContent = (id, title) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index].title = title;
    localStorage.setItem("task", JSON.stringify(tasks));
    props.get();
  };

  const deleteSingleTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    const newTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("task", JSON.stringify(newTasks));
    props.get();
  };

  const addNewTask = () => {
    if (title !== "") {
      const tasks = JSON.parse(localStorage.getItem("task")) || [];
      const newTask = {
        id: nanoid(),
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
    <div
      className={`h-screen w-full p-8 overflow-y-auto flex flex-col relative`}
    >
      {currList.length > 0 ? (
        <>
          {currList &&
            currList.map((task) => (
              <Task
                key={task.id}
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
          <span className="material-symbols-outlined text-gray-400 text-3xl">
            add
          </span>
          <input
            type="text"
            className="ml-2 text-3xl text-gray-400 outline-none text w-full "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={addNewTask}
            autoFocus
            placeholder="Add task"
          />
        </div>
      )}

      {currList.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full grayscale opacity-40 flex flex-col gap-5 items-center z-0">
          <img
            src={
              props.tab !== 2
                ? "https://i.ibb.co/ZL2LxJf/hand-illus.png"
                : "https://i.ibb.co/SwMXYzX/boy-1300226.png"
            }
            alt="illustration"
            className="w-48 md:w-64"
          />
          <span className="p-2 text-center text-lg md:text-3xl">
            {props.tab !== 2
              ? "Click anywhere to add a task"
              : "Uh Oh! You haven't completed any tasks yet!"}
          </span>
        </div>
      )}

      {!props.add.add && !inEditMode && (
        <div
          ref={props.bottom}
          className="flex-grow min-h-[30px] z-10"
          onClick={() => props.add.setAdd(true)}
        ></div>
      )}
    </div>
  );
}
