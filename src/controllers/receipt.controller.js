const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ticketService = require("../services/ticket.service");
const receiptService = require("../services/receipt.service");

const getReceiptsByUserId = catchAsync(async (req, res) => {
  const receipts = await receiptService.getReceiptsByUserId(req.params.userId);
  if (!receipts) {
    throw new ApiError(404, "Receipts not found");
  }
  res.status(200).send(receipts);
});

module.exports = {
  getReceiptsByUserId,
};
