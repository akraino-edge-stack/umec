import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem, boxShadow } from "../../util/style";

import Divider from "../divider/Divider";

export const Panel = themed(styled.div`
    box-sizing: border-box;

    position: relative;

    margin: ${rem(20)} 0;
    padding: 0;

    background-color: ${fromTheme('palette', 'white')};
    color: ${fromTheme('palette', 'uiDarkGray')};

    border-radius: ${rem(2)};
    box-shadow: ${boxShadow(2)};
`);

export const PanelHeader = themed(styled.div`
    box-sizing: border-box;

    font-size: ${rem(20)};

    height: ${rem(46)};
    padding: ${rem(10)} ${rem(14)} ${rem(10)} ${rem(14)};

`);

export const PanelBody = themed(styled.div`
    box-sizing: border-box;

    display: block;

    min-height: ${rem(86)};
    padding: ${rem(14)} ${rem(20)} ${rem(22)} ${rem(14)};
`);

export const PanelDivider = themed(styled(Divider)`
    margin: 0 ${rem(4)};
    width: calc(100% - ${rem(8)});
`);
