// --CSS--
import styles from './css/Home.module.css';

// --Image--
import savings from '../../img/savings.svg';

// --Layout--
import LinkButton from '../layout/LinkButton';

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Profeto" />
            <img src={savings} alt="Costs" />
        </section>
    );
}

export default Home;