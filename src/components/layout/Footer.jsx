// --Icons--
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

// --CSS--
import styles from './css/Footer.module.css';

function Footer() {
    return (
        <>
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs</span> &copy; 2021
            </p>
        </footer>
        </>
    );   
}

export default Footer;