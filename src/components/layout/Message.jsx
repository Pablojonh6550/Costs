// --Hooks--
import { useState, useEffect } from 'react';

// --CSS--
import styles from './css/Message.module.css';

function Message({ type, message }) {

    const [visible, setVisible] = useState(false);
    useEffect(() =>{
        if(!message){
            setVisible(false);
            return
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>
                {message}
            </div>
        )}
        </>
    );

}

export default Message;