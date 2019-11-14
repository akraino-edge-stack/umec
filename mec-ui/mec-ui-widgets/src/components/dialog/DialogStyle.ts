import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem, boxShadow } from "../../util/style";

import Divider from "../divider/Divider";

export { Divider };

export const Dialog = themed(styled.div`
    &:before, &:after {
        content: '';
        display: table;
    }

    box-sizing: border-box;
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    position: relative;
    margin: auto;

    width: 500px;

    margin-top: ${rem(80)};

    padding: 0 ${rem(28)} ${rem(20)};
    color: ${fromTheme('palette', 'foreground')};
    background: ${fromTheme('palette', 'white')};

    border-radius: ${fromTheme('common', 'borderRadius')};

    box-shadow: ${boxShadow(24)};

    &.active {
        border-top: ${rem(4)} solid ${fromTheme('palette', 'hilight2')};
    }
    &.warning {
        border-top: ${rem(4)} solid ${fromTheme('palette', 'warningYellow')};
    }
    &.critical {
        border-top: ${rem(4)} solid ${fromTheme('palette', 'alertRed')};
    }
`);

export const DialogHeader = themed(styled.div`
    position: relative;
`);

export const DialogTitle = themed(styled.h3`
    font-size: ${rem(20)};

    margin-top: ${rem(22)};
`);

export const DialogSubtitle = themed(styled.h5`
    color: ${fromTheme('palette', 'darkGray')};
    font-size: ${rem(16)};

    margin-bottom: ${rem(16)};
`);

export const DialogContent = themed(styled.div`
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    margin-top: ${rem(10)};
`);

export const DialogFooter = themed(styled.div`
    &:before, &:after {
        content: '';
        clear: both;
        display: block;
    }
    &:after {
        flex: 1;
    }

    display: flex;
    align-items: flex-end;

    padding-top: ${rem(20)};
    border-top: ${rem(1)} solid ${fromTheme('palette', 'dividerColor')};
`);

export const DialogAction = themed(styled.div`
    order: 1;

    button {
        float: left;
    }

    button + button {
        margin-left: ${rem(8)};
    }
`);

export const DialogBackground = themed(styled.div`
    display: block;

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    outline: 0;

    overflow: hidden;

    background: ${fromTheme('palette', 'dividerColor')};
`);
