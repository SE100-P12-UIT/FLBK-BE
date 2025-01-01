const allRoles = {
  user: [
    "createTickets",
    "getTickets",
    "getFlights",
    "getReceipts",
    "cancelFlight",
    "viewHistoryBookFlight",
    "searchUserByEmail",
  ],
  employee: [
    "getUsers",
    "getTickets",
    "getReceipts",
    "createTickets",
    "searchUserByEmail",
    "manageFlights",
    "getFlights",
    "managePlanes",
  ],
  admin: [
    "manageEmployees",
    "createTickets",
    "getTickets",
    "getReceipts",
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
