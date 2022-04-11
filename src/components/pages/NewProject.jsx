// --Hooks--
import { useNavigate } from 'react-router-dom';

// --Form--
import ProjectForm from '../project/ProjectForm';

// --CSS--
import styles from './css/NewProject.module.css';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        // initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((request) => request.json())
        .then((data) => { 
            console.log(data);
            navigate('/projects', {message: 'Projeto criado com sucesso! '});
        }) //redirect
        .catch(error => console.log(error));

    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Pojeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} buttonText="Criar Projeto" />
        </div>
    );
}

export default NewProject;