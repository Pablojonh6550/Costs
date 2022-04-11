import {parse, v4 as uuiv4} from 'uuid';

// --CSS--
import styles from './css/Project.module.css';

// --Hooks--
import { useParams } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

// --Layout--
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

// --Pages--
import ProjectForm from '../project/ProjectForm';

// --Services--
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [messageService, setMessageService] = useState();
    const [type, setType] = useState();

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
                setServices(data.services);
            })
            .catch(error => console.log(error))
        }, 300) 
    }, [id]);

    function editPost(project) {
        setMessage('');
        // budget validation
        if(project.budget < project.cost) {
           setMessage('O orçamento não pode ser menor que o custo do projeto!');
           setType('error');
           return false;
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
            setMessage('Projeto atualizado!');
            setType('success');

        })
        .catch(error => console.log(error));
    }
    
    function createService(project) {
        setMessageService('');

        const lastService = project.services[project.services.length - 1];
        lastService.id = uuiv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        // Validation services
        if(newCost > parseFloat(project.budget)) {
            setMessageService('Orçamento ultrapassado, verifique o valor do serviço.');
            setType('error');
            project.services.pop();
            return false;

        }

        project.cost = newCost;
        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((request => request.json()))
        .then((data) => {
            setMessageService('Serviço adicionado ao projeto.');
            setType('success');
            setShowServiceForm(false);
        })
        .catch(error => console.log(error));

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }
    
    function removeService(id, cost) {
        setMessage('');
        
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        );

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((request) => request.json())
        .then((data) => {
            setProject(projectUpdated);
            setServices(servicesUpdated);
            setMessage('Serviço removido com sucesso!');
            setType('success');
        })
        .catch(error => console.log(error));
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass= "column">
                    {message && <Message type={type} message={message} />}
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
                    <div className={styles.service_form_container}>
                    {messageService && <Message type={type} message={messageService} />}
                        <h2>Adicionar um Serviço:</h2>
                        <button className={styles.button} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adiconar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info_service}>
                            {showServiceForm && (
                                <ServiceForm handleSubmit={createService} textButton="Adicionar serviço" projectData={project}/>
                            )}
                        </div>
                    </div>
                    <h2>Serviços:</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard 
                                   id={service.id}
                                   name={service.name}  
                                   cost={service.cost} 
                                   description={service.description}
                                   key={service.id}
                                   handleRemove={removeService} 

                                />
                            ))

                        }{services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
            ) : (
            <Loading />
         )
        }
    
    </>);
}

export default Project;