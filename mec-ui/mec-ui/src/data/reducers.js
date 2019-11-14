import { combineReducers } from "redux";

import dashboardReducer from "./reducers/dashboard";
import servicesReducer from "./reducers/service";
import addServiceDialogReducer from "./reducers/addServiceDialog";
import transportReducer from "./reducers/transport";
import addTransportDialogReducer from "./reducers/addTransportDialog";
import wizardReducer from "./reducers/wizard";

const reducer = combineReducers({
    dashboard: dashboardReducer,
    service: servicesReducer,
    addServiceDialog: addServiceDialogReducer,
    transport: transportReducer,
    addTransportDialog: addTransportDialogReducer,
    wizard: wizardReducer,
});

export default reducer;
