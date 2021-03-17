export const fields = [
    {
        type: "String",
        titleLabel: "What is your name?",
        order: 1,
        required: true,
        keyRef: "name",
    },
    {
        type: "String",
        titleLabel: "What school do you go to?",
        order: 2,
        required: true,
        keyRef: "school",
    },
    {
        required: true,
        titleLabel: "What is your program name?",
        order: 3,
        type: "String",
        keyRef: "program",
    },
    {
        order: 4,
        required: true,
        titleLabel: "What is your year of study?",
        type: "Integer",
        keyRef: "studyLevel",
        limit: [1, 100],
    },
    {
        type: "Integer",
        order: 5,
        required: true,
        titleLabel: "What is your age?",
        keyRef: "age",
        limit: [12, 100],
    },
    {
        required: true,
        order: 6,
        type: "String",
        titleLabel: "What country are you from?",
        keyRef: "country",
    },
    {
        titleLabel: "What city are you from?",
        type: "String",
        required: false,
        order: 7,
        keyRef: "city",
    },
    {
        order: 8,
        requred: true,
        type: "String",
        titleLabel: "Describe yourself",
        keyRef: "description",
        charLimit: 1000,
    },
    {
        titleLabel: "Etnhicity",
        type: "String",
        order: 9,
        required: true,
        keyRef: "ethnicity",
    },
    {
        order: 10,
        type: "String",
        required: true,
        titleLabel: "What is your experience with programming?",
        keyRef: "exp",
    },
    {
        titleLabel: "Gender",
        options: ["Male", "Female", "Non-binary", "Prefer not to answer"],
        required: true,
        type: "dropdown",
        order: 11,
        keyRef: "gender",
    },
    {
        titleLabel: "When will you graduate?",
        order: 12,
        required: true,
        type: "Integer",
        keyRef: "gradYear",
        limit: [2021, 3000000],
    },
    {
        titleLabel: "How many hackathons have you attended",
        type: "Integer",
        required: true,
        order: 13,
        keyRef: "hackNum",
        limit: [1, 10000],
    },
    {
        order: 14,
        type: "String",
        titleLabel: "How did you hear about us?",
        required: true,
        keyRef: "hearAbout",
    },
    {
        titleLabel: "Do you agree to MLH terms?",
        type: "Boolean",
        order: 15,
        required: true,
        keyRef: "mlhAuth",
    },
];

export const fieldKeys = fields.map((field) => field.keyRef);

export const profileUpdateObject = (updatedAt) => ({
    updatedAt,
});

export const verifyAdminURL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5001/ru-hacks-app-page/us-central1/admin/verify"
        : "https://us-central1-ru-hacks-app-page.cloudfunctions.net/admin";
