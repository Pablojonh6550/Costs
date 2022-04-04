// --Hooks--
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// --Layout--
import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

// --Project--

import ProjectCard from "../project/ProjectCard";

// --CSS--
import styles from "./css/Projects.module.css";

function Projects() {
    const [projects, setProjects] = useState([]);
    const location = useLocation();

    let message = '';

    if (location.state) {
        message =location.state.message;

    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(request => request.json())
        .then(data => {
            setProjects(data);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <>
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" message={message} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => 
                        <ProjectCard 
                        id={project.id}
                        name={project.name} 
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        />
                    )}
            </Container>
        </div>
        </>
    );
}

export default Projects;