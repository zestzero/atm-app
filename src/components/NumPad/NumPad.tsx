import { FunctionComponent, useCallback, useState } from 'react';
import { maskingString } from '../../utils/stringUtils';
import NumButton from '../NumButton/NumButton';

const NumPad: FunctionComponent = () => {
    const [pin, setPin] = useState<string>('');
    const onPinClicked = useCallback(
        (value: string) => {
            if (pin.length < 4) {
                setPin(pin.concat(value));
            }
        },
        [pin],
    );
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
                <NumButton number="<" onClick={onPinClicked} />
                <NumButton number="0" onClick={onPinClicked} />
                <NumButton number="⏎" onClick={onPinClicked} />
            </div>
        </div>
    );
};

export { NumPad };
