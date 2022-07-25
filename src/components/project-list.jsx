import axios from "axios";
import React from "react";
import SingleProject from "./single-project";

const ProjectList = ({
    projects,
    setProjects,
    setNameProject,
    setTempId,
    setShowModal,
    setIsUpdate,
}) => {
    const handleDelete = (id) => {
        try {
            axios.delete(`http://localhost:3001/projects/${id}`);
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (id) => {
        const selectedProject = projects.find((project) => project.id === id);
        setNameProject(selectedProject.name);
        setShowModal(true);
        setTempId(id);
        setIsUpdate(true);
    };

    return (
        <div className="p-2">
            {projects?.map((project) => {
                return (
                    <SingleProject
                        key={project.id}
                        project={project}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                );
            })}
        </div>
    );
};

export default ProjectList;
