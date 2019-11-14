import styled from "../util/styledComponents";
import { themed } from "../util/theme";
import { rem } from "../util/style";

import { FixedContainer } from "../components/grid/Grid";
import { BANNER_HEIGHT } from "../components/banner/BannerStyle";

export const Content = themed(styled(FixedContainer)`
    margin-top: ${BANNER_HEIGHT};
`);
