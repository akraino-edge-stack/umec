import styled from "../../util/styledComponents";
import { themed, fromTheme } from "../../util/theme";
import { rem } from "../../util/style";

import { FixedContainer } from "../grid/Grid";

export const BANNER_HEIGHT = rem(60);

export const Banner = themed(styled.header`
    display: block;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 1;

    width: 100%;

    color: ${fromTheme('palette', 'foregroundLight')};
    background-color: ${fromTheme('palette', 'bannerBg')};
`);

export const BannerContent = themed(styled(FixedContainer)`
    height: ${BANNER_HEIGHT};
`);

export const BannerProduct = themed(styled.div`
    display: flexbox;

    height: 100%;
    overflow: hidden;

    margin: 0 ${rem(14)};

    align-items: center;

    font-family: ${fromTheme('font', 'fontFamilySansSerif')};
    font-size: ${rem(20)};
    font-weight: 600;
    color: ${fromTheme('palette', 'hilight2')};
`);

export const ProductName = themed(styled.span`
`);
