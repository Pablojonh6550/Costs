import {Link} from 'react-router-dom';

// --Layout--
import Container from './Container';

// --CSS--
import styles from './css/Navbar.module.css';
import logo from '../../img/costs_logo.png';

function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                <img src={logo} alt="costs" />
                </Link>
                <span>COSTS</span>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>
                
                {/* <Link to="/newproject">New Project</Link> */}
            </Container>
        </nav>
    );    
}

export default Navbar;