// --CSS--
import styles from './css/ProjectForm.module.css';

// --Input--
import Input from '../form/Input'; 

function ProjectForm() {
    return (
        <form className={styles.form}>
                <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" />
                <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o valor total do projeto" />           
            <div>
                <select name="category_id">
                    <option disabled>Selecione a categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar projeto" />
            </div>
        </form>
    );

}

export default ProjectForm;