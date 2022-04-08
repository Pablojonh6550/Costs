// --Hooks--
import { useEffect, useState } from 'react'; 

// --CSS--
import styles from './css/ProjectForm.module.css';

// --Form--
import Input from '../form/Input';
import Select from '../form/Select'; 
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ handleSubmit, buttonText, projectData}) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(()=>{
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then((request) => request.json())
        .then((data) => {setCategories(data)})
        .catch((error) => console.log(error));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);

    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value });
        console.log(project);

    }

    function handleCategory(e) {
        setProject({...project, 
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        });
        
    }


    return (
        <form onSubmit={submit} className={styles.form}>
                <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ''} />
                <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o valor total do projeto" handleOnChange={handleChange} value={project.budget ? project.budget : ''} />           
                <Select name="category_id" text="Selecione a categoria"  options={categories} handleOnChange={handleCategory}  value={project.category ? project.category.id : ''} />
                <SubmitButton text={buttonText} />
        </form>
    );

}

export default ProjectForm;