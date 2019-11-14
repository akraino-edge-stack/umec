import { createGlobalStyle } from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";

export default themed(createGlobalStyle`
    html, body {
        box-sizing: border-box;
        font-family: ${fromTheme('font', 'fontFamilySansSerif')};
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    p {
        margin: 0 0 10px;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
        margin-bottom: 10px;
    }

    h1, h2, h3 {
        margin-top: 20px;
    }

    h4, h5, h6 {
        margin-top: 10px;
    }

    h1 {
        font-size: 36px;
    }

    h2 {
        font-size: 30px;
    }

    h3 {
        font-size: 24px;
    }

    h4 {
        font-size: 18px;
    }

    h5 {
        font-size: 14px;
    }

    h6 {
        font-size: 12px;
    }
`);
