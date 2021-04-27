const text = {
    successfulRegistrationText:
        "We have sent a confirmation link to your email, please verify your account before logging in",
    noEmailOrPasswordOrPasswordConfirm:
        "Email, password and password confirmation are empty...",
    noPasswordOrPasswordConfirm:
        " Password and password confirmation fields are empty...",
    noPasswordConfirm: "Password confirmation is empty...",
    passwordsDoNotMatch: "Passwords do not match",

    dialogTitles: {
        confirmDeleteTeam: "Are you sure you'd like to delete this team?",
        confirmKickUsers:
            "Are you sure you'd like to kick this user/these users?",
    },

    dialogDescriptions: {
        confirmDeleteTeam:
            "This is irreversible, all members of the team will be kicked from the team including yourself",
        confirmKickUsers:
            "This is irreversible, the selected user(s) will be kicked",
    },

    quickStatus: {
        incompleteApplication: "Application Incomplete!",
        completeApplication: "Application Complete!",
        confirmed: "Confirmation Complete!",
        admitted: "Admitted!",
        declined: "Declined Confirmation",
        rejected: "Application Refused",
    },

    statusDescription: {
        incompleteApplication: "Your application has not yet been completed!",
        completeApplication:
            "Your application is complete, we'll get back to you soon! ",
        confirmed:
            "We've received your confirmation! You can join our Discord by clicking below:",
        admitted:
            "Congratulations! You've been admitted. Please complete your confirmation by clicking on confirmation in the navigation",
        declined:
            "We're sad to hear that you could not participate this year. Please reconsider applying next year!",
        rejected:
            "Unfortunately you have not been admitted to this year's hackathon. Please consider applying next year!",
    },

    confirmation: {
        whyDiscord:
            "We will mainly be using Discord for communications regarding workshops, judging times, twitch event times etc... and we need to be able to verify you once you join our server",
        connectedDiscord:
            "We got you! Now when you join our server we should be able to automatically verify you :)",
        uploadResume:
            "If you have a resume you'd like to share, you can upload it by pressing the button here. We'll be sharing it with our sponsors. File size limit is 5MB and it must be a .pdf or .doc/.docx",
    },

    team: {
        teamDescriptionNoTeam:
            "You can either create a team or join a team with a specified ID provided by any of the team members you are trying to join",
        teamDescriptionTeam:
            "You can see all your team members along with their emails. The team owner may delete the team or individuals may wish to leave the team",
    },
};

export default text;
