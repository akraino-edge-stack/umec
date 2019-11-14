import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem } from "../../util/style";

export const Divider = themed(styled.div`
    box-sizing: border-box;

    display: block;

    width: 100%;
    height: 0;

    margin: ${rem(16)} 0;

    border-top: ${rem(1)} solid ${fromTheme('palette', 'dividerColor')};
`);
