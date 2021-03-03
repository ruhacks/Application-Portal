import React, { Component } from 'react';
import AppForm from './AppForm';
import { connect } from 'react-redux';
import { getUserDocument, getUsersApplication } from '../../../redux/actions';
import { CircularProgress } from '@material-ui/core';


class Application extends Component {
    componentDidMount(){
        const { getUsersApplication, user } = this.props;
        getUsersApplication(user);
    }


    render(){

        const {application, isRequestingApp} = this.props

        if(isRequestingApp) {
            return <CircularProgress />
        }
        return(
            <AppForm application ={application}/>
        )
    }
}

function mapStateToProps(state){
    return {
        application: state.app.app,
        isRequestingApp: state.app.isRequestingApp,
        user: state.auth.user,
        gettingProfile: state.auth.gettingProfile,
        profile: state.auth.profile,
    };
}

function mapDispatchToProps(dispatch){
    return {
        getUsersApplication: (user) =>{
            dispatch(getUsersApplication(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);