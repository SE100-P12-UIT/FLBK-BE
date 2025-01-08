const allRoles = {
  user: [
    "createTickets",
    "getTickets",
    "getFlights",
    "getTicketTypes",
    "getReceipts",
    "cancelTickets",
    "searchUserByEmail",
  ],
  employee: [
    "getUsers",
    "getTickets",
    "getReceipts",
    "getTicketTypes",
    "createTickets",
    "manageTickets",
    "searchUserByEmail",
    "manageFlights",
    "getFlights",
    "managePlanes",
    "manageReports",
  ],
  admin: [
    "manageEmployees",
    "createTickets",
    "getTickets",
    "getReceipts",
    "getUsers",
    "getFlights",
    "getTicketTypes",
    "searchUserByEmail",
    "manageTickets",
    "managePlanes",
    "manageUsers",
    "manageRoles",
    "manageTicketTypes",
    "manageReports",
    "manageFlights",
    "manageRules",
    "manageReports",
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
