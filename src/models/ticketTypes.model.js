const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const ticketTypesSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  coefficient: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
});

ticketTypesSchema.statics.isTicketTypeTaken = async function (
  name,
  excludeTicketTypeId
) {
  const ticketType = await this.findOne({
    typeName: name,
    _id: { $ne: excludeTicketTypeId },
  });
  return !!ticketType;
};

ticketTypesSchema.plugin(toJSON);

const TicketTypes = mongoose.model("TicketTypes", ticketTypesSchema);

module.exports = TicketTypes;
