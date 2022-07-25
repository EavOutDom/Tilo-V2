import React, { useState } from "react";
import Modal from "../components/modal";
import ProjectList from "../components/project-list";
import axios from "axios";

const Home = ({ projects, setProjects }) => {
    const [showModal, setShowModal] = useState(false);
    const [nameProject, setNameProject] = useState("");
    const [tempId, setTempId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleCreateUpdateProject = async () => {
        if (isUpdate) {
            try {
                const response = await axios.put(
                    `http://localhost:3001/projects/${tempId}`,
                    {
                        name: nameProject,
                    }
                );
                const data = response.data;
                setProjects(
                    projects.map((project) =>
                        project.id === tempId
                            ? { ...project, name: data.name }
                            : project
                    )
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:3001/projects",
                    {
                        name: nameProject,
                    }
                );
                const data = response.data;
                setProjects([...projects, data]);
                setNameProject("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <div className="m-2 flex justify-end">
                <button
                    className="bg-blue-500 text-white rounded-md p-2"
                    onClick={() => setShowModal(true)}
                >
                    Create New
                </button>
            </div>
            {showModal && (
                <Modal>
                    <h1 className={"text-center"}>
                        {isUpdate ? "Update" : "Create"} New Project
                    </h1>

                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            placeholder="name..."
                            className={"p-1 rounded-sm"}
                            value={nameProject}
                            onChange={(e) => {
                                setNameProject(e.target.value);
                            }}
                        />
                    </div>
                    <div className={"absolute bottom-2 right-2"}>
                        <button
                            className="w-16 bg-blue-500 text-white rounded-md py-1 mr-1"
                            onClick={() => {
                                setShowModal(false);
                                handleCreateUpdateProject();
                            }}
                        >
                            {isUpdate ? "Update" : "Create"}
                        </button>
                        <button
                            className="w-16 bg-red-500 text-white rounded-md py-1 ml-1"
                            onClick={() => {
                                setShowModal(false);
                                setNameProject("");
                                setIsUpdate(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
            {projects.length > 0 ? (
                <div>
                    <ProjectList
                        projects={projects}
                        setProjects={setProjects}
                        nameProject={nameProject}
                        setNameProject={setNameProject}
                        setShowModal={setShowModal}
                        setTempId={setTempId}
                        setIsUpdate={setIsUpdate}
                    />
                </div>
            ) : (
                <h1 className="text-center mt-8">No projects found</h1>
            )}
        </div>
    );
};

export default Home;
