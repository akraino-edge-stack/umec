import React from "react";

import {
    Row,
    Col3,
    Col9,
    Col12,
    Divider,
    Banner,
    Header,
    Panel,
    Button,
    TextField,
    layout,
} from "mec-ui-widgets";

import ServiceListContainer from "./ServiceListContainer";
import AddServiceWizardContainer from "./AddServiceWizardContainer";

const { NavBar, Content } = layout.fullPage;

const Dashboard = (props) => {
    const {
        hostInput,
        host,
        wizardOpen,

        onHostInputChanged,
        onSetHost,
        onOpenWizard,
    } = props;

    return (
        <React.Fragment>
            <NavBar product="Akraino µMEC Challenge">
            </NavBar>

            <Content>
                <Row>
                    <Col12>
                        <Header>MEC Services</Header>
                    </Col12>
                </Row>

                <Row>
                    <Col12>
                        <Panel title="ETSI MEC API">
                            <Row>
                                <Col9>
                                    <TextField
                                        placeholder="MEC11 API URL"
                                        value={hostInput}
                                        onChange={onHostInputChanged}
                                    />
                                </Col9>

                                <Col3>
                                    <Button onClick={() => onSetHost(hostInput)}>
                                        Connect to API
                                    </Button>
                                </Col3>
                            </Row>

                            <Divider />

                            <Row>
                                <Col12>
                                    <a href="https://forge.etsi.org/swagger/ui/?url=https://forge.etsi.org/gitlab/mec/gs011-app-enablement-api/raw/master/Mp1.yaml">
                                        Browse ETSI MEC API definitions
                                    </a>
                                </Col12>
                            </Row>
                        </Panel>
                    </Col12>
                </Row>

                <Row>
                    <Col12>
                        <ServiceListContainer />
                    </Col12>
                </Row>

                <Row>
                    <Col12>
                        <Button style="default" onClick={onOpenWizard}>
                            Register new service
                        </Button>
                    </Col12>
                </Row>
            </Content>

            {wizardOpen ? (
                <AddServiceWizardContainer />
            ) : undefined}
        </React.Fragment>
    );
};

export default Dashboard;
