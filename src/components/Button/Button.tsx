import { FunctionComponent, memo } from 'react';
import { throttle } from 'utils/throttle';

interface Props {
    value?: string;
    onClick: (value?: string) => void;
    className?: string;
    dataCy?: string;
}

const Button: FunctionComponent<Props> = memo((props) => {
    const throttleClick = throttle(() => props.onClick(props.value));
    return (
        <button data-cy={props.dataCy} className={props.className} onClick={throttleClick}>
            {props.children}
        </button>
    );
});

export default Button;
