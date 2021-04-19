const mongoose = require("mongoose");
const vehiculeSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  maintenance: {
    type: Boolean,
    required: false,
  },
  kilometrage: {
    type: Number,
    required: false,
  },
  reserved: {
    type: Boolean,
    required: true,
    default: false,
  },
  driver: {
    type: String,
    required: false,
  },

  heat: {
    type: String,
    required: false,
  },
  oillvl: {
    type: String,
    required: false,
  },
  year: {
    type: Date,
    required: false,
    default: mongoose.now,
  },
});

module.exports = mongoose.model("vehicule", vehiculeSchema);
