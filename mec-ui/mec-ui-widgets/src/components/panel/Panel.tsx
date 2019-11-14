import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./PanelStyle";

export interface IPanel {
    title?: string,
    children?: any,
    overrides?: IOverrides,
};

export default (props: IPanel) => {
    const { title, children, overrides } = props;

    const {
        "Panel": {
            component: Panel,
            props: panelProps,
        },
        "PanelHeader": {
            component: PanelHeader,
            props: headerProps,
        },
        "PanelBody": {
            component: PanelBody,
            props: bodyProps,
        },
        "PanelDivider": {
            component: PanelDivider,
            props: dividerProps,
        },
    } = getComponents(defaultComponents, overrides);

    return (
        <Panel {...panelProps}>
            <PanelHeader {...headerProps}>
                {title}
            </PanelHeader>

            <PanelDivider {...dividerProps} />

            <PanelBody {...bodyProps}>
                {children}
            </PanelBody>
        </Panel>
    );
};
