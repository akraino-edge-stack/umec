import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./ButtonStyle";

export interface IButton {
    size?: "small" | "large",
    style?: "default",
    onClick?: any,
    className?: string,
    overrides?: IOverrides,
    children?: any,
};

export default (props: IButton) => {
    const { onClick, size, style, className, children, overrides } = props;

    const {
        "Button": {
            component: Button,
            props: buttonProps,
        },
    } = getComponents(defaultComponents, overrides);

    let classes = [];
    if (className) {
        classes.push(className);
    }
    if (size) {
        classes.push(size);
    }
    if (style) {
        classes.push(style);
    }

    return (
        <Button onClick={onClick} className={classes.join(' ')} {...buttonProps}>
            {children}
        </Button>
    );
};
