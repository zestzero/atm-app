import { FunctionComponent, memo } from 'react';
import NumButton from './NumButton';
import styles from './GroupNumPad.module.scss';

interface Props {
    dataCy: string;
    onButtonClick: (val?: string) => void;
    onBackspaceClick: () => void;
    onResetClick: () => void;
}

const GroupNumPadComponent: FunctionComponent<Props> = ({ onButtonClick, onBackspaceClick, onResetClick, dataCy }) => {
    return (
        <>
            <div className={styles.row}>
                <NumButton dataCy={dataCy} number="1" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="2" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="3" onClick={onButtonClick} />
            </div>
            <div className={styles.row}>
                <NumButton dataCy={dataCy} number="4" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="5" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="6" onClick={onButtonClick} />
            </div>
            <div className={styles.row}>
                <NumButton dataCy={dataCy} number="7" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="8" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="9" onClick={onButtonClick} />
            </div>
            <div className={styles.row}>
                <NumButton dataCy={dataCy} number="<" onClick={onBackspaceClick} />
                <NumButton dataCy={dataCy} number="0" onClick={onButtonClick} />
                <NumButton dataCy={dataCy} number="-" onClick={onResetClick} />
            </div>
        </>
    );
};

export default memo(GroupNumPadComponent);
