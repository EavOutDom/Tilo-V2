import React from "react";
import SingleTask from "./single-task";

const TaskList = ({ tasks, handleUpdate, handleDelete }) => {
    return (
        <div className="p-2">
            {tasks.map((task) => {
                return (
                    <SingleTask
                        key={task.id}
                        task={task}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                );
            })}
        </div>
    );
};

export default TaskList;
