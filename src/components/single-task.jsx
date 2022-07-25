import React from "react";
import CardList from "./card-list";

const SingleTask = ({ task, handleUpdate, handleDelete }) => {
    return (
        <div className="shadow-lg bg-slate-200 mb-3 px-2 font-semibold py-4 rounded-md flex justify-between">
            <div>
                <h1 className={"font-bold"}>{task.name}</h1>
                <div>
                    <CardList taskId={task.id} />
                </div>
            </div>
            <div>
                <button onClick={() => handleUpdate(task.id)}>Update</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
};

export default SingleTask;
