import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem } from "../../util/style";

export const Input = themed(styled.input`
    box-sizing: border-box;
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    width: 100%;

    border: ${fromTheme('common', 'border')};
    border-radius: ${fromTheme('common', 'borderRadius')};

    outline: none;

    &:focus {
        border-color: ${fromTheme('common', 'focusBorderColor')};
    }

    &:hover {
        border-color: ${fromTheme('common', 'hoverBorderColor')};
    }

    height: ${rem(32)};
    padding: ${rem(6)} ${rem(12)};
    color: ${fromTheme('palette', 'foreground')};
    font-size: ${rem(14)};

    &::selection {
        font-weight: 600;
        color: ${fromTheme('palette', 'darkGray')};
        background: ${fromTheme('palette', 'selectionColor')};
    }

    &::-webkit-input-placeholder {
        color: ${fromTheme('palette', 'placeholderColor')};
    }
    &:-ms-input-placeholder {
        color: ${fromTheme('palette', 'placeholderColor')};
    }
    &::-moz-placeholder {
        color: ${fromTheme('palette', 'placeholderColor')};
    }

    &.small {
        height: ${rem(26)};
        padding: ${rem(4)} ${rem(6)};
    }

    &.error {
        font-weight: 600;
        color: ${fromTheme('palette', 'alertRed')};
    }
`);
