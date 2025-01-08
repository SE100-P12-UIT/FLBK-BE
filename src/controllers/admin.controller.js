const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const adminService = require("../services/admin.service");

const generateFlightReport = catchAsync(async (req, res) => {
  const report = await adminService.generateFlightReport(
    req.query.startDate,
    req.query.endDate
  );

  res.status(200).send(report);
});

module.exports = {
  generateFlightReport,
};
