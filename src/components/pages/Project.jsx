// --CSS--
import styles from './css/Project.module.css';

// --Hooks--
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

// --Layout--
import Loading from '../layout/Loading';
import Container from '../layout/Container';

// --Pages--
import ProjectForm from '../project/ProjectForm';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((request) => request.json())
            .then((data) => {
                setProject(data);
            })
            .catch(error => console.log(error))
        }, 300) 
    }, [id]);

    function editPost(project) {
        // budget validation
        if(project.budget < project.cost) {
            // message
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((request) => request.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            //message

        })
        .catch(error => console.log(error));
    }
    
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass= "column">
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.button} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Toral Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} buttonText="Atualizar" projectData={project} />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            ) : (
            <Loading />
         )
        }
    
    </>);
}

export default Project;