import * as React from "react";

import { getComponents, IOverrides } from "../util/override";

import * as defaultComponents from "./FullPageStyle";

import Banner from "../components/banner/Banner";

export interface IContent {
    children?: any,
    overrides?: IOverrides,
};

export const NavBar = Banner;

export const Content = (props: IContent) => {
    const { children, overrides } = props;

    const {
        "Content": {
            component: Content,
            props: contentProps,
        },
    } = getComponents(defaultComponents, overrides);

    return (
        <Content {...contentProps}>
            {children}
        </Content>
    );
}
