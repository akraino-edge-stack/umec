export interface IOverrides {
    [key: string]: {
        component?: any,
        props?: any,
    };
};

export function getComponents(defaultComponents: any, overrides: IOverrides = {}): IOverrides {
    return Object.keys(defaultComponents).reduce((acc, name) => {
        const override = overrides[name] || {};

        acc[name] = {
            component: override.component || defaultComponents[name],
            props: {...override.props},
        };

        return acc;
    }, {});
};
