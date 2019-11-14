import React from "react";
import _ from "lodash";

import { Button } from "mec-hackathon-widgets";

import ServicePanel from "./ServicePanel";

const ServiceList = (props) => {
    const {
        serviceList,
        refreshing,

        onRefresh,

        onExpandDetails,
        onCloseDetails,
    } = props;

    return (
        <div>
            {_.map(serviceList, (data, index) => (
                <ServicePanel
                    key={data.serName}
                    service={data}
                    onExpandDetails={() => onExpandDetails(data.serInstanceId)}
                    onCloseDetails={() => onCloseDetails(data.serInstanceId)}
                />
            ))}
        </div>
    );
};

export default ServiceList;
