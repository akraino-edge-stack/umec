import * as React from "react";
import _ from "lodash";
import onClickOutside from "react-onclickoutside";

import { getComponents, IOverrides } from "../../util/override";

import * as defaultComponents from "./PulldownStyle";

export interface IPulldownItem {
    key: string,
    text: string,
}

export interface IPulldown {
    items: Array<IPulldownItem>,
    selected?: string,
    onSelect?: any,
    overrides?: IOverrides,
};

interface PulldownState {
    open: boolean,
}

class Pulldown extends React.Component<IPulldown, PulldownState> {
    constructor(props: IPulldown) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleClickOutside() {
        this.setState({ open: false });
    }

    render() {
        const {
            items,
            selected,
            onSelect,
            overrides,
        } = this.props;

        const {
            "Pulldown": {
                component: Pulldown,
                props: pulldownProps,
            },
            "PulldownMenu": {
                component: PulldownMenu,
                props: pulldownMenuProps,
            },
            "PulldownItem": {
                component: PulldownItem,
                props: pulldownItemProps,
            },
            "PulldownToggle": {
                component: PulldownToggle,
                props: pulldownToggleProps,
            },
            "SelectedLabel": {
                component: SelectedLabel,
                props: selectedLabelProps,
            },
            "SelectedCaret": {
                component: SelectedCaret,
                props: selectedCaretProps,
            },
            "Caret": {
                component: Caret,
                props: caretProps,
            },
        } = getComponents(defaultComponents, overrides);

        let selectedItem;
        if (selected) {
            selectedItem = _.find(items, (item) => (item.key === selected));
        } else {
            selectedItem = {
                key: "none",
                text: "",
            };
        }

        return (
            <Pulldown {...pulldownProps}>
                <PulldownToggle
                    onClick={this.handleOpen}
                    {...pulldownToggleProps}
                >
                    <SelectedLabel {...selectedLabelProps}>
                        <span>{selectedItem.text}</span>
                    </SelectedLabel>
                    <SelectedCaret {...selectedCaretProps}>
                        <Caret {...caretProps} />
                    </SelectedCaret>
                </PulldownToggle>

                <PulldownMenu className={this.state.open ? "open" : ""} {...pulldownMenuProps}>
                    {_.map(items, (item) => (
                        <PulldownItem
                            key={item.key}
                            className={item.key === selectedItem.key ? "selected" : ""}
                            onClick={() => {
                                if (onSelect) {
                                    onSelect(item.key);
                                }
                                this.handleClose();
                            }}
                            {...pulldownItemProps}
                        >
                            {item.text}
                        </PulldownItem>
                    ))}
                </PulldownMenu>
            </Pulldown>
        );
    }
};

export default onClickOutside(Pulldown);
