const ApiError = require("../utils/ApiError");
const Receipt = require("../models/receipt.model");

const createReceipt = async (receiptBody) => {
  return await Receipt.create(receiptBody);
};

const getReceiptById = async (id) => {
  return await Receipt.findById(id);
};

const getReceipts = async () => {
  return await Receipt.find();
};

const getReceiptsByUserId = async (userId) => {
  const receipts = await Receipt.find({ userId: userId });
  if (!receipts) {
    throw new ApiError(404, "Receipts not found");
  }
  return receipts;
};

const updateReceipt = async (receiptId, updateBody) => {
  const receipt = await Receipt.findByIdAndUpdate(receiptId, updateBody, {
    new: true,
  });
  if (!receipt) {
    throw new ApiError(404, "Receipt not found");
  }
  return receipt;
};

const deleteReceipt = async (receiptId) => {
  const receipt = await Receipt.findByIdAndDelete(receiptId);
  if (!receipt) {
    throw new ApiError(404, "Receipt not found");
  }
  return receipt;
};

module.exports = {
  createReceipt,
  getReceiptById,
  getReceipts,
  getReceiptsByUserId,
  updateReceipt,
  deleteReceipt,
};
