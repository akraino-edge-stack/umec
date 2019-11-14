import _ from "lodash";

import styled from "../../util/styledComponents";
import { rem } from "../../util/style";

const GUTTER = 8;

export const Container = styled.div`
    box-sizing: border-box;

    width: 100%;

    padding: 0 ${rem(GUTTER)};
`;

export const FixedContainer = styled(Container)`
    width: 90%;
    max-width: ${rem(1260)};

    margin: 0 auto;
`;

export const Row = styled.div`
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;

    margin: ${rem(8)} ${rem(-GUTTER)};
`;

const Column = styled.div`
    box-sizing: border-box;

    position: relative;
    width: 100%;
    padding: 0 ${rem(GUTTER)};
`;

export const Col = styled(Column)`
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
`;

function makeCol(index) {
    const width = 100.0 * (index / 12);
    return styled(Column)`
        flex: 0 0 ${width}%;
        max-width: ${width}%;
    `;
}

export const Col1 = makeCol(1);
export const Col2 = makeCol(2);
export const Col3 = makeCol(3);
export const Col4 = makeCol(4);
export const Col5 = makeCol(5);
export const Col6 = makeCol(6);
export const Col7 = makeCol(7);
export const Col8 = makeCol(8);
export const Col9 = makeCol(9);
export const Col10 = makeCol(10);
export const Col11 = makeCol(11);
export const Col12 = makeCol(12);
