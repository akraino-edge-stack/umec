import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./DialogStyle";

export interface IDialog {
    title: string,
    footer: any,
    style?: "active" | "warning" | "critical",
    subtitle?: string,
    className?: string,
    children?: any,
    overrides?: IOverrides,
};

export default (props: IDialog) => {
    const {
        title,
        footer,
        style,
        subtitle,
        className,
        children,
        overrides,
    } = props;

    const {
        "Divider": {
            component: Divider,
            props: dividerProps,
        },
        "Dialog": {
            component: Dialog,
            props: dialogProps,
        },
        "DialogHeader": {
            component: DialogHeader,
            props: headerProps,
        },
        "DialogTitle": {
            component: DialogTitle,
            props: titleProps,
        },
        "DialogSubtitle": {
            component: DialogSubtitle,
            props: subtitleProps,
        },
        "DialogContent": {
            component: DialogContent,
            props: contentProps,
        },
        "DialogFooter": {
            component: DialogFooter,
            props: footerProps,
        },
        "DialogAction": {
            component: DialogAction,
            props: actionProps,
        },
        "DialogBackground": {
            component: DialogBackground,
            props: bgProps,
        },
    } = getComponents(defaultComponents, overrides);

    let classes = [];
    if (className) {
        classes.push(className);
    }
    if (style) {
        classes.push(style);
    }

    return (
        <DialogBackground {...bgProps}>
            <Dialog className={classes.join(' ')} {...dialogProps}>
                <DialogHeader {...headerProps}>
                    <DialogTitle {...titleProps}>
                        {title}
                    </DialogTitle>
                    <DialogSubtitle {...subtitleProps}>
                        {subtitle}
                    </DialogSubtitle>
                    <Divider {...dividerProps} />
                </DialogHeader>

                <DialogContent {...contentProps}>
                    {children}
                </DialogContent>

                <DialogFooter {...footerProps}>
                    <DialogAction {...actionProps}>
                        {footer}
                    </DialogAction>
                </DialogFooter>
            </Dialog>
        </DialogBackground>
    );
};
