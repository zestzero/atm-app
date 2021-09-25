import { FunctionComponent, memo, useState } from 'react';
import Button from 'components/Button/Button';
import GroupNumPad from 'components/NumButton/GroupNumPad';
import styles from './NumPad.module.scss';

interface Props {
    onSubmit: (pin?: string) => void;
    onCancel: () => void;
}

const NumPad: FunctionComponent<Props> = (props) => {
    const [val, setVal] = useState<string>('');
    const onNumberClick = (value?: string) => {
        setVal(val.concat(value || ''));
    };
    const onBackspaceClick = () => {
        const result = val.substr(0, val.length - 1);
        setVal(result);
    };
    const onResetClick = () => setVal('');
    const onEnterClick = () => {
        props.onSubmit(val);
        setVal('');
    };

    return (
        <div>
            <div className={styles.textContainer}>
                <p data-cy="numpad-text" className={styles.padText}>
                    {val}
                </p>
            </div>
            <GroupNumPad
                onButtonClick={onNumberClick}
                onBackspaceClick={onBackspaceClick}
                onResetClick={onResetClick}
            />
            <Button className={styles.submitBtn} onClick={onEnterClick}>
                Enter
            </Button>
            <Button className={styles.cancelBtn} onClick={props.onCancel}>
                Cancel
            </Button>
        </div>
    );
};

export default memo(NumPad);
