import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskList from "../components/task-list";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/modal";
const Project = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [nameTask, setNameTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [tempId, setTempId] = useState(null);
    const [project, setProject] = useState({});

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/projects/${id}/tasks`
            );
            const data = response.data;
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProject = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/projects/${id}`
            );
            const data = response.data;
            setProject(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        fetchProject();
    }, []);

    // console.log(project?.name?.length);

    const handleCreateUpdateTask = async () => {
        if (isUpdate) {
            try {
                const response = await axios.put(
                    `http://localhost:3001/tasks/${tempId}`,
                    {
                        name: nameTask,
                        projectId: parseInt(id),
                    }
                );
                const data = response.data;
                setTasks(
                    tasks.map((task) =>
                        task.id === tempId ? { ...task, name: nameTask } : task
                    )
                );
                setIsUpdate(false);
                setNameTask("");
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const response = await axios.post(
                    `http://localhost:3001/projects/${id}/tasks`,
                    {
                        name: nameTask,
                        projectId: parseInt(id),
                    }
                );
                const data = response.data;
                setTasks([...tasks, data]);
                setNameTask("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            axios.delete(`http://localhost:3001/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTask = async (id) => {
        const selectedTask = tasks.find((task) => task.id === id);
        setTempId(id);
        setNameTask(selectedTask.name);
        setIsUpdate(true);
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex justify-between m-2 items-center">
                <Link to={"/"}>
                    <button className="bg-black text-white rounded-md p-2">
                        Back
                    </button>
                </Link>
                <h1 className="font-semibold text-xl">
                    {project?.name?.length > 14
                        ? project.name.substr(0, 14) + "..."
                        : project.name}
                </h1>
                <button
                    className="bg-blue-500 text-white rounded-md p-2"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Create New
                </button>
            </div>
            {showModal && (
                <Modal>
                    <h1 className={"text-center"}>
                        {isUpdate ? "Update" : "Create"} New Task
                    </h1>

                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            placeholder="name..."
                            className={"p-1 rounded-sm"}
                            value={nameTask}
                            onChange={(e) => {
                                setNameTask(e.target.value);
                            }}
                        />
                    </div>
                    <div className={"absolute bottom-2 right-2"}>
                        <button
                            className="w-16 bg-blue-500 text-white rounded-md py-1 mr-1"
                            onClick={() => {
                                setShowModal(false);
                                handleCreateUpdateTask();
                            }}
                        >
                            {isUpdate ? "Save" : "Create"}
                        </button>
                        <button
                            className="w-16 bg-red-500 text-white rounded-md py-1 ml-1"
                            onClick={() => {
                                setShowModal(false);
                                setIsUpdate(false);
                                setNameTask("");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
            {tasks.length > 0 ? (
                <div>
                    <TaskList
                        tasks={tasks}
                        handleDelete={handleDeleteTask}
                        handleUpdate={handleUpdateTask}
                    />
                </div>
            ) : (
                <h1 className="text-center mt-8">No tasks found</h1>
            )}
        </div>
    );
};

export default Project;
