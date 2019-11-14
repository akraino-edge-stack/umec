import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Row, Col12 } from "../src/components/grid/Grid";
import Button from "../src/components/button/Button";

import Wizard from "../src/components/wizard/Wizard";

storiesOf("Components/Wizard", module)
    .add("default", () =>  (
        <Wizard
            title="Wizard"
            steps={[
                {
                    key: "1",
                    name: "First Step",
                    component: (
                        <div/>
                    ),
                    active: false,
                    completed: true,
                },
                {
                    key: "2",
                    name: "Second Step",
                    component: (
                        <Row>
                            <Col12>
                                <Button style="default">
                                    Next
                                </Button>
                            </Col12>
                        </Row>
                    ),
                    active: true,
                    completed: false,
                },
                {
                    key: "3",
                    name: "Third Step",
                    component: (
                        <div />
                    ),
                    active: false,
                    completed: false,
                },
            ]}
        />
    ));
