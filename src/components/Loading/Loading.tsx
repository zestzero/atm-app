import { FunctionComponent } from 'react';
import styles from './Loading.module.scss';

const Loading: FunctionComponent = () => {
    return (
        <div className={styles.rippleLoading}>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loading;
