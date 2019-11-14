import * as React from "react";
import _ from "lodash";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./WizardStyle";

export interface IStep {
    key: string,
    name: string,
    component: any,
    active: boolean,
    completed: boolean,
};

export interface IWizard {
    title?: string,
    steps: Array<IStep>
    overrides?: IOverrides,
};

export default (props: IWizard) => {
    const { title, steps, overrides } = props;

    const {
        "Wizard": {
            component: Wizard,
            props: wizardProps,
        },
        "Steps": {
            component: Steps,
            props: stepsProps,
        },
        "StepMarker": {
            component: StepMarker,
            props: markerProps,
        },
    } = getComponents(defaultComponents, overrides);

    const activeStep = _.find(steps, (step) => step.active);

    return (
        <Wizard
            title={title}
            subtitle={activeStep.name}
            style="active"
            footer={(
                <React.Fragment>
                    {_.map(steps, (step) => (
                        <StepMarker
                            key={step.key}
                            className={step.active ?
                                "active" :
                                (step.completed ? "completed": "")
                            }
                            {...markerProps}
                        />
                    ))}
                </React.Fragment>
            )}
            overrides={{
                DialogAction: {
                    component: Steps,
                    props: stepsProps,
                }
            }}
            {...wizardProps}
        >
            {activeStep.component}
        </Wizard>
    );
};
