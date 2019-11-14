import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./DividerStyle";

export interface IDivider {
    className?: string,
    overrides?: IOverrides,
};

export default (props: IDivider) => {
    const { className, overrides } = props;

    const {
        "Divider": {
            component: Divider,
            props: dividerProps,
        },
    } = getComponents(defaultComponents, overrides);

    return (
        <Divider className={className} {...dividerProps} />
    );
};
