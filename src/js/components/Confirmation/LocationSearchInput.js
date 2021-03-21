/* eslint-disable react/no-string-refs */
import { Button, Typography } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

class LocationSearchInput extends React.Component {
    static propTypes = {
        callbackFcn: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.autocomplete = null;
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            {}
        );

        this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    }

    initialState() {
        return {
            street_number: "",
            street_address: "",
            second_address: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
            googleMapLink: "",
            formError: false,
            errorText: "",
        };
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            street_number,
            street_address,
            second_address,
            city,
            state,
            postal_code,
            country,
            googleMapLink,
        } = this.state;

        if (
            !street_number ||
            !street_address ||
            !city ||
            !state ||
            !postal_code ||
            !country
        ) {
            let errorText = "";
            if (!street_number) errorText = "Invalid street number";
            if (!street_address) errorText = "Invalid street address";
            if (!city) errorText = "Invalid City";
            if (!state) errorText = "Invalid state/province";
            if (!postal_code) errorText = "Invalid Postal code";
            if (!country) errorText = "Invalid country";

            this.setState({
                formError: true,
                errorText,
            });
        } else {
            this.setState({
                formError: false,
            });
            this.props.callbackFcn({
                street_number,
                street_address,
                second_address,
                city,
                state,
                postal_code,
                country,
                googleMapLink,
            });
        }
    }

    handlePlaceSelect() {
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;
        let street_number = "",
            street_address = "",
            city = "",
            state = "",
            postal_code = "",
            country = "",
            googleMapLink = addressObject.url;
        address.map((comp) => {
            if (comp.types.includes("administrative_area_level_1")) {
                state = comp.short_name;
            } else if (comp.types.includes("street_number")) {
                street_number = comp.short_name;
            } else if (comp.types.includes("route")) {
                street_address = comp.short_name;
            } else if (comp.types.includes("locality")) {
                city = comp.short_name;
            } else if (comp.types.includes("country")) {
                country = comp.long_name;
            } else if (comp.types.includes("postal_code")) {
                postal_code = comp.long_name;
            }
        });
        this.setState({
            street_number,
            street_address,
            city,
            state,
            postal_code,
            country,
            googleMapLink,
        });
    }

    render() {
        return (
            <div>
                <Typography variant="body1">
                    We need your address in case you win any of the various
                    prizes were giving away during the hacakthon
                </Typography>
                {this.state.formError && (
                    <Typography component="p" className={"error"}>
                        {"Invalid address!"}
                    </Typography>
                )}
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="autocomplete"
                        className="input-field"
                        ref="input"
                        type="text"
                        placeholder="Start typing an address..."
                        style={{ width: "100%" }}
                    />
                    <input
                        name={"street_number"}
                        value={this.state.street_number}
                        placeholder={"Street Number"}
                        onChange={this.handleChange}
                        style={{ width: "25%" }}
                    />
                    <input
                        name={"street_address"}
                        value={this.state.street_address}
                        placeholder={"Street Address"}
                        onChange={this.handleChange}
                        style={{ width: "50%" }}
                    />
                    <input
                        name={"second_address"}
                        value={this.state.second_address}
                        placeholder={"Secondary Address"}
                        onChange={this.handleChange}
                        style={{ width: "100%" }}
                    />
                    <input
                        name={"city"}
                        value={this.state.city}
                        placeholder={"City"}
                        onChange={this.handleChange}
                        style={{ width: "100%" }}
                    />
                    <input
                        name={"state"}
                        value={this.state.state}
                        placeholder={"State"}
                        onChange={this.handleChange}
                        style={{ width: "100%" }}
                    />
                    <input
                        name={"country"}
                        value={this.state.country}
                        placeholder={"Country"}
                        onChange={this.handleChange}
                        style={{ width: "100%" }}
                    />
                    <input
                        name={"postal_code"}
                        value={this.state.postal_code}
                        placeholder={"Postal Code"}
                        onChange={this.handleChange}
                        style={{ width: "100%" }}
                    />
                    <Button
                        onClick={this.handleSubmit}
                        variant="contained"
                        fullWidth
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}
export default LocationSearchInput;
