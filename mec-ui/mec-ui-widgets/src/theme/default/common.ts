import { CommonTheme } from "../themeInterface";
import { rem } from "../../util/style";

import palette from "./palette";

const common: CommonTheme = {
    border: `${rem(1)} solid ${palette.borderColor}`,
    borderColor: palette.borderColor,
    focusBorder: `${rem(1)} solid ${palette.darkGray}`,
    focusBorderColor: palette.darkGray,
    hoverBorder: `${rem(1)} solid ${palette.hilight1}`,
    hoverBorderColor: palette.hilight1,

    borderRadius: rem(3),
};
export default common;
