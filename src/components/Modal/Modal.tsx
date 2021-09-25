import { FunctionComponent } from 'react';
import styles from './Modal.module.scss';

interface Props {
    shouldDisplay: boolean;
}

const Modal: FunctionComponent<Props> = (props) => {
    return props.shouldDisplay ? (
        <div className={styles.container}>
            <div className={styles.content}>{props.children}</div>
        </div>
    ) : null;
};

export default Modal;
