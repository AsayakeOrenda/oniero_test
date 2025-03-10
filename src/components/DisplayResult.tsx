import {FC, ReactElement} from 'react';

type Props<T> = {
    id: string,
    title: string,
    result: T,
    resultFormatter?: Function | undefined,
}

const DisplayResult: FC<Props<unknown>> = ({id, title, result, resultFormatter}):ReactElement => {
    return (
        <div className="" data-testid={`display-${id}`}>
            <h3 className="font-semibold">{title}</h3>
            <p>{resultFormatter ? resultFormatter(result) : result}</p>
        </div>
    );
};

export default DisplayResult;
