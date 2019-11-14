import * as React from "react";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./BannerStyle";

export interface IBanner {
    product: string,
    productShort?: string,
    children?: any,
    overrides?: IOverrides,
};

export default (props: IBanner) => {
    const { product, productShort, children, overrides } = props;

    const {
        "Banner": {
            component: Banner,
            props: bannerProps,
        },
        "BannerContent": {
            component: BannerContent,
            props: contentProps,
        },
        "BannerProduct": {
            component: BannerProduct,
            props: productProps,
        },
        "ProductName": {
            component: ProductName,
            props: productNameProps,
        },
    } = getComponents(defaultComponents, overrides);

    return (
        <Banner {...bannerProps}>
            <BannerContent {...contentProps}>
                <BannerProduct {...productProps}>
                    <ProductName {...productNameProps}>
                        {product}
                    </ProductName>
                </BannerProduct>
            </BannerContent>
        </Banner>
    );
};
