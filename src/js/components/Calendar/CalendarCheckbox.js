import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
export default class CalendarCheckbox extends Component {
    render() {
        const { id, filter, refThis } = this.props;
        return (
            <div class="cal-bops__checkbox">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filter[id]}
                            onChange={(e) => {
                                let newState = filter;
                                newState[id] = e.target.checked;
                                refThis.setState({ filter: newState });
                            }}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={this.props.children}
                />
            </div>
        );
    }
}
