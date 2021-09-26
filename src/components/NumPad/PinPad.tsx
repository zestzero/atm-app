import { FunctionComponent, memo, useEffect, useState } from 'react';
import { maskingString } from 'utils/stringUtils';
import GroupNumPad from 'components/NumButton/GroupNumPad';
import styles from './NumPad.module.scss';

interface Props {
    pinLength: number;
    onAuthClick: (pin?: string) => void;
}

const PinPad: FunctionComponent<Props> = (props) => {
    const [pin, setPin] = useState<string>('');
    const onPinClicked = (value?: string) => {
        if (pin.length < props.pinLength) {
            setPin(pin.concat(value || ''));
        }
    };
    const onBackspaceClick = () => {
        const result = pin.substr(0, pin.length - 1);
        setPin(result);
    };
    const onResetClick = () => setPin('');

    useEffect(() => {
        if (pin.length === props.pinLength) {
            props.onAuthClick(pin);
        }
    }, [pin]);

    return (
        <div>
            <div className={styles.textContainer}>
                <p data-cy="pinpad-text" className={styles.padText}>
                    {maskingString(pin)}
                </p>
            </div>
            <GroupNumPad
                dataCy="pinpad"
                onButtonClick={onPinClicked}
                onBackspaceClick={onBackspaceClick}
                onResetClick={onResetClick}
            />
        </div>
    );
};

export default memo(PinPad);
