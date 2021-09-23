import { FunctionComponent } from 'react';
import Button from 'components/Button/Button';
import styles from './NumButton.module.scss';

interface Props {
    number: string;
    onClick: (value?: string) => void;
}

const NumButton: FunctionComponent<Props> = (props) => {
    return (
        <Button className={styles.NumButton} value={props.number} onClick={props.onClick}>
            {props.number}
        </Button>
    );
};

export default NumButton;
