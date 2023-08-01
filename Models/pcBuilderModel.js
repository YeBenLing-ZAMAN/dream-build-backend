const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Products = require("./productsModel");
const PcBuilderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
  },
  pcComponent: [
    {
      type: Schema.Types.ObjectId,
      ref: Products,
    },
  ],
});

const PcBuilder = mongoose.model("PcBuilder", PcBuilderSchema);
module.exports = PcBuilder;
