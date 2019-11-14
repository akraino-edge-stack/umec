import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem, boxShadow } from "../../util/style";

import Button from "../../components/button/Button";

export const Pulldown = themed(styled.div`
    box-sizing: border-box;
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    position: relative;
    display: inline-flex;
    width: 100%;

    min-width: ${rem(6)};
`);

export const PulldownMenu = themed(styled.div`
    box-sizing: border-box;

    position: absolute;
    top: 100%;
    left: 0;
    z-index: 998;
    display: none;
    float: left;
    width: 100%;

    &.open {
      display: block;
    }

    color: ${fromTheme('palette', 'darkGray')};
    font-size: ${rem(14)};

    text-align: left;
    list-style: none;
    background-color: ${fromTheme('palette', 'white')};
    background-clip: padding-box;

    border: ${rem(1)} solid ${fromTheme('palette', 'gray')};
    box-shadow: ${boxShadow(8)};
`);

export const PulldownItem = themed(styled.a`
    box-sizing: border-box;

    display: block;
    width: 100%;
    clear: both;
    text-align: inherit;
    cursor: pointer;

    height: ${rem(27)};
    padding: ${rem(3)} 1.5rem ${rem(3)} ${rem(12)};

    color: ${fromTheme('palette', 'darkGray')};
    background: 0 0;
    text-decoration: none;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    border: 0;
    box-shadow: none;

    &:focus {
        border: ${fromTheme('common', 'focusBorder')};
        outline: none;
        background-color: ${fromTheme('palette', 'white')};
    }

    &:hover {
        border: none;
        color: ${fromTheme('palette', 'foreground')};
        background-color: ${fromTheme('palette', 'lightGray')};
    }

    &:active {
        color: ${fromTheme('palette', 'foreground')};
        background-color: ${fromTheme('palette', 'lightGray')};
    }

    &.selected {
        color: ${fromTheme('palette', 'foreground')};
        background-color: ${fromTheme('palette', 'selectionColor')};
    }
`);

export const SelectedLabel = themed(styled.span`
    box-sizing: border-box;

    flex: 1;
    border-right: none;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    padding-right: ${rem(15)};
`);

export const SelectedCaret = themed(styled.span`
    box-sizing: border-box;

    border-left: ${rem(1)} solid ${fromTheme('palette', 'lightGray')};
`);

export const Caret = themed(styled.span`
    box-sizing: border-box;

    display: inline-block;

    width: 0;
    height: 0;
    margin-left: ${rem(2)};
    vertical-align: middle;
    border-top: ${rem(4)} dashed;
    border-right: ${rem(4)} solid transparent;
    border-left: ${rem(4)} solid transparent;
`);

export const PulldownToggle = themed(styled(Button)`
    margin-left: 0;
    padding-left: ${rem(12)};
    padding-right: ${rem(12)};
    width: 100%;
    display: flex;

    > span {
      height: ${rem(31)};
      line-height: ${rem(31)};
    }

    ${Caret} {
        margin: 0 0 0 ${rem(12)};
        border-top: ${rem(5)} solid;
        color: ${fromTheme('palette', 'darkGray')};
    }
`);
