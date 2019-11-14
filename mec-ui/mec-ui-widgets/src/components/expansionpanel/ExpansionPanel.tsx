import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./ExpansionPanelStyle";

export interface IExpansionPanel {
    title: string,
    description: any,
    expanded: boolean,
    onOpen?: any,
    onClose?: any,
    children?: any,
    overrides?: IOverrides, };

export default (props: IExpansionPanel) => {
    const {
        title,
        description,
        expanded,
        onOpen,
        onClose,
        children,
        overrides
    } = props;

    const {
        "ExpansionPanel": {
            component: ExpansionPanel,
            props: panelProps,
        },
        "PanelHeader": {
            component: PanelHeader,
            props: headerProps,
        },
        "PanelTitle": {
            component: PanelTitle,
            props: titleProps,
        },
        "PanelDescription": {
            component: PanelDescription,
            props: descriptionProps,
        },
        "PanelBody": {
            component: PanelBody,
            props: bodyProps,
        },
        "PanelDivider": {
            component: PanelDivider,
            props: dividerProps,
        },
        "Caret": {
            component: Caret,
            props: caretProps,
        },
    } = getComponents(defaultComponents, overrides);

    return (
        <ExpansionPanel
            className={expanded ? "expanded" : ""}
            {...panelProps}
        >
            <PanelHeader
                as="button"
                onClick={expanded ? onClose : onOpen}
                {...headerProps}
            >
                <PanelTitle {...titleProps}>
                    {title}
                </PanelTitle>
                <PanelDescription {...descriptionProps}>
                    {description}
                </PanelDescription>
                <Caret />
            </PanelHeader>

            {((expanded) ? (
                <React.Fragment>
                    <PanelDivider {...dividerProps} />

                    <PanelBody {...bodyProps}>
                        {children}
                    </PanelBody>
                </React.Fragment>
            ) : undefined)}
        </ExpansionPanel>
    );
};
