/* export default [
    {
        title: "General",
        links: [{ title: "Home", link: "/" }],
    },
    {
        title: "Forms",
        links: [
            {
                title: "Application",
                link: "/application",
                conditions: ["emailVerified"],
            },
            {
                title: "Confirmation",
                link: "/confirmation",
                conditions: ["emailVerified", "admitted"],
            },
        ],
    },
]; */

const ifVerified = [
    {
        title: "General",
        links: [{ title: "Home", link: "/" }],
    },
    {
        title: "Forms",
        links: [
            {
                title: "Application",
                link: "/application",
                conditions: ["emailVerified"],
            },
        ],
    },
];

const ifAdmitted = [
    {
        title: "General",
        links: [{ title: "Home", link: "/" }],
    },
    {
        title: "Forms",
        links: [
            {
                title: "Application",
                link: "/application",
                conditions: ["emailVerified"],
            },
            {
                title: "Confirmation",
                link: "/confirmation",
                conditions: ["emailVerified", "admitted"],
            },
        ],
    },
];

export const generateTabs = (profile, emailVerified) => {
    if (profile.admitted) {
        return ifAdmitted;
    } else if (emailVerified) {
        return ifVerified;
    } else {
        return [];
    }
};
