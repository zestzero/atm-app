import { FunctionComponent, memo } from 'react';
import NumButton from './NumButton';
import styles from './GroupNumPad.module.scss';

interface Props {
    onButtonClick: (val?: string) => void;
    onBackspaceClick: () => void;
    onResetClick: () => void;
}

const GroupNumPadComponent: FunctionComponent<Props> = ({ onButtonClick, onBackspaceClick, onResetClick }) => {
    return (
        <>
            <div className={styles.row}>
                <NumButton number="1" onClick={onButtonClick} />
                <NumButton number="2" onClick={onButtonClick} />
                <NumButton number="3" onClick={onButtonClick} />
            </div>
            <div className={styles.row}>
                <NumButton number="4" onClick={onButtonClick} />
                <NumButton number="5" onClick={onButtonClick} />
                <NumButton number="6" onClick={onButtonClick} />
            </div>
            <div className={styles.row}>
                <NumButton number="7" onClick={onButtonClick} />
                <NumButton number="8" onClick={onButtonClick} />
                <NumButton number="9" onClick={onButtonClick} />
            </div>
            <div className={styles.row}>
                <NumButton number="<" onClick={onBackspaceClick} />
                <NumButton number="0" onClick={onButtonClick} />
                <NumButton number="-" onClick={onResetClick} />
            </div>
        </>
    );
};

export default memo(GroupNumPadComponent);
