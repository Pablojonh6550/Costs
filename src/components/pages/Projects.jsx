// --Hooks--
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// --Layout--
import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import Loading from "../layout/Loading";

// --Project--

import ProjectCard from "../project/ProjectCard";

// --CSS--
import styles from "./css/Projects.module.css";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setprojectMessage] = useState('');
    const location = useLocation();

    let message = '';

    if (location.state) {
        message =location.state.message;

    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            }).then(request => request.json())
            .then(data => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch(error => console.log(error))
            }, 300);
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(request => request.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id));
            setprojectMessage('Projeto removido com sucesso!');
        })
        .catch(error => console.log(error)); 
    }

    return (
        <>
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" message={message} />}
            {projectMessage && <Message type="error" message={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                        id={project.id}
                        name={project.name} 
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados...</p>
                    )}
            </Container>
        </div>
        </>
    );
}

export default Projects;