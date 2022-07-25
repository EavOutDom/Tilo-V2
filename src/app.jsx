import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "./components/heading";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Project from "./pages/project";

const App = () => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:3001/projects");
            const data = response.data;
            setProjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <BrowserRouter>
            <div
                className={
                    "absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]"
                }
            >
                <div
                    className={
                        "w-80 h-96 bg-white rounded-lg shadow-xl duration-500 md:w-[40rem] md:h-[30rem] overflow-auto"
                    }
                >
                    <Heading />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    projects={projects}
                                    setProjects={setProjects}
                                />
                            }
                        />
                        <Route path={"project/:id"} element={<Project />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
