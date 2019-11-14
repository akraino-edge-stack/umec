import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem } from "../../util/style";

export const Header = themed(styled.h1`
    box-sizing: border-box;
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    margin: ${rem(30)} ${rem(14)} ${rem(20)} ${rem(14)};

    color: ${fromTheme('palette', 'foreground')};

    font-size: ${rem(40)};
    font-weight: 600;
    line-height: ${rem(45)};

    &.small {
        margin-top: ${rem(20)};

        font-size: ${rem(20)};
        line-height: ${rem(22)};
    }

    &.large {
        margin-top: ${rem(40)};

        font-size: ${rem(60)};
        line-height: ${rem(65)};
    }
`);
