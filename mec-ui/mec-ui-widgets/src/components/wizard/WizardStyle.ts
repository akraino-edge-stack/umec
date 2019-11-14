import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem } from "../../util/style";

import Dialog from "../dialog/Dialog";

const Wizard = Dialog;

export { Wizard };

export const Steps = themed(styled.ul`
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
    height: ${rem(24)};

    margin: 0 auto;

    list-style: none;
`);

export const StepMarker = themed(styled.li`
    width: ${rem(20)};
    height: ${rem(20)};

    &::before {
        content: "\\2022";

        padding: 0 ${rem(7)};
        font-size: ${rem(32)};

        color: ${fromTheme('palette', 'gray')};
    }

    &.active {
        &::before{
            color: ${fromTheme('palette', 'hilight1')};
        }
    }
`);
