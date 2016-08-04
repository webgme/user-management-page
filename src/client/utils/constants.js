/**
 * Hold constants
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Theme colors:
export const THEME_COLORS = {
    blue: 'rgb(60, 141, 188)',
    green: 'rgb(0, 166, 90)',
    purple: 'rgb(96, 92, 168)',
    red: 'rgb(221, 75, 57)',
    yellow: 'rgb(243, 156, 18)'
};

const DEFAULT_DATE = new Date(1447879297957);

export const DEFAULT_ISODATE = DEFAULT_DATE.toISOString();

export const TABLE_FIELDS = {
    organizationMembers: {
        User: 'name',
        Admin: 'isAdmin'
    },
    organizations: {
        "Organization Name": "name"
    },
    projectUser: {
        Access: "rights",
        User: "name"
    },
    projectOrg: {
        Organization: "name",
        Access: "rights"
    },
    projects: {
        "Created At": ["info", "createdAt"],
        "Last Changed": ["info", "modifiedAt"],
        "Last Viewed": ["info", "viewedAt"],
        "Owner": "owner",
        "Project Name": "name"
    },
    users: {
        User: "_id"
    }
};
