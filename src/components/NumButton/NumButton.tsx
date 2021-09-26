import { FunctionComponent, memo } from 'react';
import Button from 'components/Button/Button';
import styles from './NumButton.module.scss';

interface Props {
    dataCy?: string;
    number: string;
    onClick: (value?: string) => void;
}

const NumButton: FunctionComponent<Props> = (props) => {
    return (
        <Button
            dataCy={`${props.dataCy}-${props.number}`}
            className={styles.NumButton}
            value={props.number}
            onClick={props.onClick}
        >
            {props.number}
        </Button>
    );
};

export default memo(NumButton);
