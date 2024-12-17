const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const ticketTypesSchema = mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    trim: true,
  },
  coefficient: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
});

ticketTypesSchema.plugin(toJSON);

const TicketTypes = mongoose.model("TicketTypes", ticketTypesSchema);

module.exports = TicketTypes;
