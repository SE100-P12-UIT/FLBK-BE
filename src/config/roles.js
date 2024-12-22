const allRoles = {
  user: [
    "bookFlight",
    "getUsers",
    "viewFlight",
    "cancelFlight",
    "viewHistoryBookFlight",
  ],
  employee: [
    "viewFlight",
    "searchUserInfo",
    "insertFlightSchedule",
    "recordBookFlight",
    "recordCancelFlight",
    "createReport",
  ],
  admin: [
    "manageEmployees",
    "getUsers",
    "searchUserByEmail",
    "manageUsers",
    "manageReports",
    "manageFlights",
    "manageRules",
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

const getPermissionByRole = (roleName) => {
  return roleRights.get(roleName);
};

module.exports = {
  roles,
  roleRights,
  getPermissionByRole,
};
