import { FormControl } from '@material-ui/core';
import React, { Component } from 'react';
import Field from './Field';

class AppForm extends Component {
    constructor(props){
        super(props)
        this.state={
            fields,
        }
        this.renderFields = this.renderFields.bind(this);
    }

    renderFields = () => {
        const { fields } = this.state
        return(
            Object.keys(fields).map(fieldName =>{
                const field = fields[fieldName];
                return(
                    <Field 
                        type = {field.type}
                        required= {field.required}
                        titleLabel = {field.titleLabel}
                        name={fieldName}
                        key = {fieldName}
                    />
                )
            })
        )
    }

    render(){
        const { application } = this.props
        console.log('APPLICATION', application)
        return(
            <FormControl>
                {this.renderFields()}
            </FormControl>
        )
        
    }
} 

export const fields = {
    name: {
        titleLabel: 'What is your name?',
        required: true,
        type: 'String',
    },
    school: {
        titleLabel: 'What school do you go to?',
        required: true,
        type: 'String',
    },
    program: {
        titleLabel: 'What is your program name?',
        required: true,
        type: 'String',
    },
    studyLevel: {
        titleLabel: 'What is your year of study?',
        required: true,
        type: 'number',
    },
    age: {
        titleLabel: 'What is your age?',
        required: true,
        type: "number",
    },
    country: {
        country: 'What country are you from?',
        required: true,
        type: 'String',
    },
    city: {
        titleLabel: 'What city are you from?',
        required: false,
        type: 'String',
    },
    description: {
        titleLabel: 'Describe yourself',
        requred: true,
        type: 'String',
    },
    ethnicity: {
        titleLabel: 'Etnhicity',
        required: true,
        type: 'String'
    },
    exp: {
        titleLabel: 'exp?',
        required: true,
        type: 'String',
    },
    gender: {
        titleLabel: 'Gender',
        required: true,
        type: 'String'
    },
    gradYear: {
        titleLabel: 'When will you graduate?',
        required: true,
        type: 'number',
    },
    hackNum: {
        titleLabel: 'How many hackathons have you attended',
        required: true,
        type: 'number'
    },
    hearAbout: {
        titleLabel: 'How did you hear about us?',
        required: true,
        type: 'String'
    },
    mlhAuth: {
        titleLabel: 'Do you agree to MLH terms?',
        required: true,
        type: 'Boolean'
    }
}

export default AppForm;