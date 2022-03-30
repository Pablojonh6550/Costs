import { Link } from 'react-router-dom';

// --CSS-- 
import styles from './css/LinkButton.module.css';

function LinkButton({to, text}) {
    return (
        <Link className={styles.button} to={to}>
            {text}
        </Link>
    );
}

export default LinkButton;