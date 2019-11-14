export default interface ThemeInterface {
    common: CommonTheme;
    font: FontTheme;
    palette: {[key: string]: string};
};

export interface CommonTheme {
    border: string;
    borderColor: string;
    focusBorder: string;
    focusBorderColor: string;
    hoverBorder: string;
    hoverBorderColor: string;

    borderRadius: string;
};

export interface FontTheme {
    fontFamilySansSerif: string;
};
