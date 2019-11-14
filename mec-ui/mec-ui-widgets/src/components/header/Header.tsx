import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./HeaderStyle";

export interface IHeader {
    size?: "small" | "large",
    className?: string,
    overrides?: IOverrides,
    children?: any,
};

export default (props: IHeader) => {
    const { size, className, children, overrides } = props;

    const {
        "Header": {
            component: Header,
            props: headerProps,
        },
    } = getComponents(defaultComponents, overrides);

    let classes = [];
    if (className) {
        classes.push(className);
    }
    if (size) {
        classes.push(size);
    }

    return (
        <Header className={classes.join(' ')} {...headerProps}>
            {children}
        </Header>
    );
};
