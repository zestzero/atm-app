import { FunctionComponent, memo, useState } from 'react';
import Button from 'components/Button/Button';
import GroupNumPad from 'components/NumButton/GroupNumPad';
import styles from './NumPad.module.scss';

interface Props {
    onSubmit: (pin?: string) => void;
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
    const onEnterClick = () => props.onSubmit(val);

    return (
        <div>
            <div className={styles.textContainer}>
                <p className={styles.padText}>{val}</p>
            </div>
            <GroupNumPad
                onButtonClick={onNumberClick}
                onBackspaceClick={onBackspaceClick}
                onResetClick={onResetClick}
            />
            <Button onClick={onEnterClick}>Enter</Button>
        </div>
    );
};

export default memo(NumPad);
