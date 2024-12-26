const allRoles = {
  user: [
    "bookFlight",
    "viewFlight",
    "cancelFlight",
    "viewHistoryBookFlight",
    "searchUserByEmail",
  ],
  employee: [
    "viewFlight",
    "getUsers",
    "searchUserByEmail",
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
    "manageRoles",
    "manageTicketTypes",
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
