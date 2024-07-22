import { useState } from "react";
import Tag from "./Tag.jsx";

export default function TaskForm(props) {
  // Functionality
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function selectTag(tag) {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  }
  function checkActiveTag(tag) {
    return taskData.tags.some((item) => item === tag);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(taskData);
    props.setTask((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  }

  return (
    <header className="flex items-center justify-center border-b-2 ">
      <form action="" className="w-[50%]" onSubmit={handleSubmit}>
        <input
          type="text"
          className=" w-full text-xl font-medium rounded bg-[#f9f9f9] py-[8px] px-[12px] mb-[15px]"
          placeholder="Enter your Task"
          onChange={handleChange}
          name="task"
          value={taskData.task}
        />
        <div className="flex items-center justify-between ">
          <div>
            <Tag
              tagName="HTML"
              selectTag={selectTag}
              selected={checkActiveTag("HTML")}
            />
            <Tag
              tagName="CSS"
              selectTag={selectTag}
              selected={checkActiveTag("CSS")}
            />
            <Tag
              tagName="JavaScript"
              selectTag={selectTag}
              selected={checkActiveTag("JavaScript")}
            />
            <Tag
              tagName="React"
              selectTag={selectTag}
              selected={checkActiveTag("React")}
            />
          </div>

          <div>
            <select
              name="status"
              id=""
              className=" t()ext-base font-medium border-[#999] w-32 h-10 py-0 px-1"
              onChange={handleChange}
              value={taskData.status}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>

            <button className="text-base font-semibold bg-[#423d7d] text-[#fff] rounded-md h-10 py-1 px-3 ml-2 border-none cursor-pointer">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
}
