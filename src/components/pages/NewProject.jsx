// --Form--
import ProjectForm from '../project/ProjectForm';

// --CSS--
import styles from './css/NewProject.module.css';

function NewProject() {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Pojeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm />
        </div>
    );
}

export default NewProject;