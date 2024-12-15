const allRoles = {
    user: [
        'bookFlight',
        'viewFlight',
        'cancelFlight',
        'viewHistoryBookFlight',
    ],
    employee: [
        'viewFlight',
        'searchUserInfo',
        'insertFlightSchedule',
        'recordBookFlight',
        'recordCancelFlight',
        'createReport',
    ],
    admin: [
        'manageEmployeeAccounts',
        'manageUserAccounts',
        'manageReports',
        'manageFlights',
        'manageRules',
    ]
}

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const getPermissionByRole = (roleName) => {
    return roleRights.get(roleName);
}

module.exports = {
    roles,
    roleRights,
    getPermissionByRole,
}