import React, {FunctionComponent} from "react";
import classnames from "classnames";

import './editable-text-widget.scss'

export interface TEditableTextWidget {
    text: string;
    isInput: boolean;
    isReadOnly?: boolean;
    isSpinner?: boolean
    classNames?: string;
    onChange?: (val: string) => void
    onEnter?: () => void
    onTextClick?: () => void
}

export const EditableText: FunctionComponent<TEditableTextWidget> = (props) => {
    const {text, isInput, classNames, onEnter, onTextClick, onChange, isReadOnly=false, isSpinner=false} = props;
    if (!isInput) {
        return (
            <span className={classnames("editable-text", classNames)}
                  onClick={() => onTextClick && onTextClick()}>
                {text}
            </span>)
    }

    const spinnerEl = isSpinner && <div className={"spinner"}/>;
    const MAX_LEN = 18;

    return (
        <div className={classnames("editable-text", classNames)}>
            <div className={"spinner-wrapper"}>
                {spinnerEl}
                <input type="text"
                       readOnly={isReadOnly}
                       value={text}
                       autoFocus={true}
                       placeholder={`max: ${MAX_LEN} characters`}
                       maxLength={MAX_LEN}
                       onChange={(e) => onChange && onChange(e.target.value)}
                       onKeyUp={(e) => {
                           if (e.keyCode === 13) {
                               e.preventDefault();
                               onEnter && onEnter()
                           }
                       }}
                       onBlur={() => onEnter && onEnter()}
                />
            </div>
        </div>
    )
};
