const allRoles = {
  user: [
    "bookFlight",
    "getFlights",
    "cancelFlight",
    "viewHistoryBookFlight",
    "searchUserByEmail",
  ],
  employee: ["getUsers", "searchUserByEmail", "manageFlights", "getFlights"],
  admin: [
    "manageEmployees",
    "getUsers",
    "getFlights",
    "searchUserByEmail",
    "managePlanes",
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
