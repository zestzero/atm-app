import { FunctionComponent } from 'react';
import styles from './Modal.module.scss';

const Modal: FunctionComponent = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

export default Modal;
