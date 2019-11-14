import ThemeInterface from "../theme/themeInterface";
import DefaultTheme from "../theme/default";

export function fromTheme(category: keyof ThemeInterface, prop: string) {
    return (props) => {
        const val = props.theme[category] ?
            props.theme[category][prop] : undefined;
        if (val === undefined) {
            console.log(`Missing prop: ${category}.${prop}`);
        }
        return val;
    };
};

export function themed(component: any): any {
    component.defaultProps = {
        theme: DefaultTheme,
    };
    return component;
};
