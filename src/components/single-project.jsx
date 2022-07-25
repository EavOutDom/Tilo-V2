import React from "react";
import { Link } from "react-router-dom";
const SingleProject = ({ project, handleDelete, handleUpdate }) => {
    return (
        <div className="flex items-center justify-between shadow-lg bg-slate-200 mb-3 px-2 font-semibold py-4 rounded-md">
            <Link to={`project/${project.id}`}>
                <div className="w-40">
                    <h1>{project.name}</h1>
                </div>
            </Link>
            <div>
                <button onClick={() => handleUpdate(project.id)}>Update</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
        </div>
    );
};

export default SingleProject;
