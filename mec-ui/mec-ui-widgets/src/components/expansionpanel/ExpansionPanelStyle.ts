import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem, boxShadow } from "../../util/style";

import * as base from "../../components/panel/PanelStyle";
import { PanelDivider }from "../../components/panel/PanelStyle";

export { PanelDivider };

export const Caret = themed(styled.span`
    box-sizing: border-box;

    display: block;

    width: 0;
    height: 0;
    margin: ${rem(8)} ${rem(4)} ${rem(8)} 0;
    vertical-align: middle;
    border: ${rem(6)} solid transparent;
`);

export const PanelHeader = themed(styled(base.PanelHeader)`
    color: ${fromTheme('palette', 'foreground')};
    background-color: ${fromTheme('palette', 'white')};
    border: none;
    width: 100%;
    text-align: left;

    display: flex;

    &:focus {
        outline: none;
    }
    &:hover, &:active {
        background-color: ${fromTheme('palette', 'selectionColor')};
    }

    & > ${Caret} {
        border-top: ${rem(7)} solid;
        color: ${fromTheme('palette', 'darkGray')};
    }
`);

export const ExpansionPanel = themed(styled.div`
    box-sizing: border-box;
    font-family: ${fromTheme('font', 'fontFamilySansSerif')};

    margin: 0;
    padding: 0;

    background: ${fromTheme('palette', 'white')};

    border-radius: ${fromTheme('common', 'borderRadius')};
    box-shadow: ${boxShadow(2)};

    & + & {
        border-top: ${rem(1)} solid ${fromTheme('palette', 'dividerColor')};
    }

    &.expanded {
        margin-bottom: ${rem(16)};

        & > ${PanelHeader} > ${Caret} {
            border-top: transparent;
            border-bottom: ${rem(7)} solid;
        }
    }
`);

export const PanelTitle = themed(styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    cursor: pointer;

    width: 75%;
    padding-right: ${rem(16)};
`);

export const PanelDescription = themed(styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    color: ${fromTheme('palette', 'gray')};
    font-size: ${rem(14)};
    height: ${rem(20)};
    line-height: ${rem(20)};

    width: calc(25% - ${rem(8)});
    padding-right: ${rem(16)};
`);

export const PanelBody = themed(styled(base.PanelBody)`
    padding: ${rem(16)} ${rem(14)};
`);
