const mongoose = require("mongoose");
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const missionSchema = new mongoose.Schema({
  missionId: {
    type: ObjectId,
  },
  vehicule_id: { type: ObjectId, ref: "Vehicule" },
  user_id: {},
  status: {
    type: String,
    required: true,
    default: "Pending",
    // min: 2,
  },
  contact: {
    type: String,
    required: true,
    // min: 2,
  },
  priority: {
    type: Number,
    required: true,
    max: 100,
    min: 1,
    default: 0,
  },
  comment: {
    type: String,
    required: false,
    max: 1024,
    min: 0,
  },
  start_Date: {
    type: Date,
    required: false,
    default: Date.now,
  },

  end_Date: {
    type: Date,

    default: mongoose.now,
  },

  start_adress: {
    type: { type: "string", enum: ["Point,LineString", "Polygon"] },
    coordinates: [],
  },
  end_adress: {
    type: { type: "string", enum: ["Point,LineString", "Polygon"] },
    coordinates: [],
  },

  created_by: {},
  created_date: {},
  modif_date: {},
});

module.exports = mongoose.model("mission", missionSchema);
