export const userProfileDefault = {
    confirmation: {
        discord: '',
        pNum: '',
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
};

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
        type: 'number',
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
        type: 'String',
    },
    exp: {
        titleLabel: 'exp?',
        required: true,
        type: 'String',
    },
    gender: {
        titleLabel: 'Gender',
        required: true,
        type: 'String',
    },
    gradYear: {
        titleLabel: 'When will you graduate?',
        required: true,
        type: 'number',
    },
    hackNum: {
        titleLabel: 'How many hackathons have you attended',
        required: true,
        type: 'number',
    },
    hearAbout: {
        titleLabel: 'How did you hear about us?',
        required: true,
        type: 'String',
    },
    mlhAuth: {
        titleLabel: 'Do you agree to MLH terms?',
        required: true,
        type: 'Boolean',
    },
};
