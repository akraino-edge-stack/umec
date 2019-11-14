import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem, boxShadow } from "../../util/style";

export const Button = themed(styled.button`
    box-sizing: border-box;
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    position: relative;
    display: inline-flex;

    justify-content: center;
    align-items: center;

    border: ${fromTheme('common', 'border')};
    border-radius: ${fromTheme('common', 'borderRadius')};

    outline: none;
    cursor: pointer;

    &:focus {
        border-color: ${fromTheme('common', 'focusBorderColor')};
    }

    &:hover {
        border-color: ${fromTheme('common', 'hoverBorderColor')};
    }

    &:active {
        border-color: ${fromTheme('common', 'borderColor')};
    }

    height: ${rem(32)};
    margin: 0;
    padding: 0 ${rem(24)};
    color: ${fromTheme('palette', 'foreground')};
    font-size: ${rem(14)};
    background: ${fromTheme('palette', 'lightGray')};
    box-shadow: ${boxShadow(2)};

    &:active {
        background: ${fromTheme('palette', 'pressedBg')};
        box-shadow: ${boxShadow(8)};
    }

    &.large {
        font-size: ${rem(16)};
        height: ${rem(42)};
    }

    &.small {
        height: ${rem(26)};
        padding: 0 ${rem(13)};
    }

    &.default {
        color: ${fromTheme('palette', 'white')};
        background: ${fromTheme('palette', 'background')};
        border: ${rem(1)} solid ${fromTheme('palette', 'foreground')};

        &:active, &:focus, &:hover {
            color: ${fromTheme('palette', 'lightGray')};
        }
    }
`);
