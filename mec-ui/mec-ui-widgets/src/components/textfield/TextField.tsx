import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./TextFieldStyle";

export interface ITextField {
    value: string,
    onChange: (e: any) => void,
    error?: boolean,
    placeholder?: string,
    size?: "small",
    overrides?: IOverrides,
};

export default (props: ITextField) => {
    const { value, onChange, error, placeholder, size, overrides } = props;

    const {
        "Input": {
            component: Input,
            props: inputProps,
        },
    } = getComponents(defaultComponents, overrides);

    let classes = [];
    if (error === true) {
        classes.push("error");
    }
    if (size) {
        classes.push(size);
    }

    return (
        <Input
            onChange={onChange}
            value={value || ''}
            className={classes.join(' ')}
            placeholder={placeholder}
            {...inputProps}
        />
    );
};
