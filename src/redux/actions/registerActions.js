/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/*                                  registerActions.js
Description:    Initialize action strings, action functions that returns action objects to the reducer (redux/reducers/register.js) and action functions that actually does the work needed to handle registrations.
                Notable things that happen here:
                    -   Dispatch various action functions that dispatches actions that get sent to the reducer which changes 

                     
*/
import { auth } from '../../firebase/index';

// Action strings
export const REGISTER_REQUEST = 'REGISTER REQUEST';
export const REGISTRATION_SUCCESSFUL = 'REGISTRATION_SUCCESSFUL';

export const REGISTER_ERROR = 'REGISTER_ERROR';

export const VERIFICATION_REQUEST = 'VERIFIACTION_REQUEST';
export const VERIFICATION_SUCCESSFULLY_SENT = 'VERIFICATION_SUCCESSFULLY_SENT';

//action functions that returns action objects to the reducer (redux/reducers/auth.js) so the reducer knows how to adjust the variables
export const requestRegister = () => {
    return {
        type: REGISTER_REQUEST,
    };
};

export const registerError = () => {
    return {
        type: REGISTER_ERROR,
    };
};

export const registerSuccess = (user) => {
    return {
        type: REGISTRATION_SUCCESSFUL,
        user,
    };
};

export const requestSendVerification = () => {
    return {
        type: VERIFICATION_REQUEST,
    };
};

export const verificationSent = (user) => {
    return {
        type: VERIFICATION_SUCCESSFULLY_SENT,
        user,
    };
};

// The functions that do the work when called upon and the ones that dispatches actions to the reducer at various stages

//Attempts to register and send verification to user
export const registerUser = (email, password) => (dispatch) => {
    dispatch(requestRegister()); //Dispatches REGISTER_REQUEST event to the reducer to change redux store state variables
    auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch(registerSuccess()); //Dispatches REGISTER_SUCCESS event to the reducer to change redux store state variables
            dispatch(requestSendVerification()); //Disaptches VERIFICATION_REQUEST event to the reducer to change redux store state variables
            createUserProfileDocument(user)//Finisih this ```+++++===
            user.user
                .sendEmailVerification()
                .then(() => {
                    dispatch(verificationSent(user)); //Dispatches VERIFICATION_SUCCESSFULLY_SENT event to the reducer to change redux store state variables
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(registerError);
                });
        })
        .catch((error) => {
            console.log(error);
            dispatch(registerError());
        });
};

export const createUserProfileDocument = (user, additionalData) => {
    if (!user) return;
    console.log('USER', user)
    // Get a reference to a place in the database where a user profile might be
    const userRef = firestore.doc(`users/${user.uid}`)

    // Go and fetch the document from that location
    userRef.get()
    .then(snapshot => {
        if(!snapshot.exists){
            const { email } = user;
    
            const defaultStatus = {
                confirmation: {
                    discord: "",
                    pNum: "",
                },
                status: {
                    admitted: false,
                    checkedIn: false,
                    completeProfile: false,
                    confirmed: false,
                    declined: false,
                    isMentor: false,
                    reimbursmentGiven: false,
                    rejected: false,
                    timestampAdmitted: '',
                },
                ...additionalData,
                uid
            }
            userRef.set({
                displayName,
                email,
                confirmation: defaultStatus.confirmation,
                status: defaultStatus.status,
                createdAt: new Date(),
            })
            .then(response => {
                console.log(response)
                return getUserDocument(user.uid)
            })
            .catch(error =>{
                console.error('Error creating user', error.message)
            })
        }
    });
    
};

export const getUserDocument = (uid) => {
    if (!uid) return null;
    firestore.collection('users').doc(uid).get()
    .then(userDocument => {
        return { uid, ...userDocument.data() };
    })
    .catch(error =>{
        console.error('Error fetching user', error.message)
    })  
}

