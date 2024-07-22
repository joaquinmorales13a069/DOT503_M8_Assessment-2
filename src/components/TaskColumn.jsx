import TaskCard from "./TaskCard";

export const TaskColumn = ({ columnName, icon, tasks, status, handleDelete }) => {
  return (
    <section className=" task_column">
      <h2 className=" flex items-center justify-center text-2xl font-bold">
        {" "}
        <img src={icon} alt="To Do icon" className=" w-8 mr-1" />
        {columnName}
      </h2>

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <TaskCard
              key={index}
              title={task.task}
              tags={task.tags}
              handleDelete={handleDelete}
              index={index}
            />
          )
      )}
    </section>
  );
};
