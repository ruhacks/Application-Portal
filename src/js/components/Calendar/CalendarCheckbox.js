import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
export default class CalendarCheckbox extends Component {
    static propTypes = {
        id: PropTypes.string,
        filter: PropTypes.object,
        refThis: PropTypes.any,
        children: PropTypes.array,
    };
    render() {
        const { id, filter, refThis } = this.props;
        return (
            <div className="cal-bops__checkbox">
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
