// --CSS--
import styles from './css/ProjectForm.module.css';

// --Form--
import Input from '../form/Input';
import Select from '../form/Select'; 
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ buttonText }) {
    return (
        <form className={styles.form}>
                <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" />
                <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o valor total do projeto" />           
                <Select name="category_id" text="Selecione a categoria"  />
                <SubmitButton text={buttonText} />
        </form>
    );

}

export default ProjectForm;