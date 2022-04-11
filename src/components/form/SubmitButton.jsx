// --CSS--
import styles from './css/SubmitButton.module.css';


function SubmitButton({ text }) {
    return(
        <div >
            <button>
                <span className={styles.button_span}>{text}</span>
            </button>
        </div>
    );
}

export default SubmitButton;