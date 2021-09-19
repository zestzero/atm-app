import { FunctionComponent, useState } from 'react';
import { maskingString } from '../../utils/stringUtils';
import Button from '../Button/Button';
import NumButton from '../NumButton/NumButton';

interface Props {
    onAuthClick: (pin?: string) => void;
}

const NumPad: FunctionComponent<Props> = (props) => {
    const [pin, setPin] = useState<string>('');
    const onPinClicked = (value?: string) => {
        if (pin.length < 4) {
            setPin(pin.concat(value || ''));
        }
    };
    const onBackspaceClicked = () => {
        const result = pin.substr(0, pin.length - 1);
        setPin(result);
    };

    const onEnterClicked = () => props.onAuthClick(pin);
    return (
        <div>
            <p>{maskingString(pin)}</p>
            <div>
                <NumButton number="1" onClick={onPinClicked} />
                <NumButton number="2" onClick={onPinClicked} />
                <NumButton number="3" onClick={onPinClicked} />
            </div>
            <div>
                <NumButton number="4" onClick={onPinClicked} />
                <NumButton number="5" onClick={onPinClicked} />
                <NumButton number="6" onClick={onPinClicked} />
            </div>
            <div>
                <NumButton number="7" onClick={onPinClicked} />
                <NumButton number="8" onClick={onPinClicked} />
                <NumButton number="9" onClick={onPinClicked} />
            </div>
            <div>
                <NumButton number="<" onClick={onBackspaceClicked} />
                <NumButton number="0" onClick={onPinClicked} />
                <NumButton number="⏎" onClick={onPinClicked} />
            </div>
            <Button onClick={onEnterClicked}>Enter</Button>
        </div>
    );
};

export { NumPad };
