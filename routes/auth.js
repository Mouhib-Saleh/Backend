const router = require("express").Router();
const User = require("../model/User");
const Mission = require("../model/Mission");
const Vehicule = require("../model/Vehicule");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cors = require("cors");
router.use(cors());
//list users
router.get("/list", async (req, res) => {
  const resultat = await User.find();

  return res.send(resultat);
});
//list vehicules
router.get("/listV", async (req, res) => {
  const resultat = await Vehicule.find();

  return res.send(resultat);
});
// register user
router.post("/register", async (req, res) => {
  const mailexist = await User.findOne({ mail: req.body.mail });
  if (mailexist) return res.status(200).send("mail exists !!");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    password: hashPassword,
    mail: req.body.mail,
    role: req.body.role,
  });
  try {
    const savedUser = await user.save();
    res.send("user created");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add Mission
router.post("/addMission", async (req, res) => {
  const mission = new Mission({
    missionId: req.body.missionId,
    status: req.body.status,
    contact: req.body.contact,
    priority: req.body.priority,
    comment: req.body.comment,
    start_Date: req.body.start_Date,
    end_Date: req.body.end_Date,
    "start_adress.coordinates": req.body.start_adress,
    "end_adress.coordinates": req.body.end_adress,
  });

  try {
    const savedMission = await mission.save();
    res.send("mission created");
  } catch (err) {
    res.status(400).send(err);
  }
});
// Add Vehicule
router.post("/addVehicule", async (req, res) => {
  const vehiculeexist = await Vehicule.findOne({
    matricule: req.body.matricule,
  });
  if (vehiculeexist) return res.status(200).send("Vehicule exists !!");
  const vehicule = new Vehicule({
    matricule: req.body.matricule,
    brand: req.body.brand,
    year: req.body.year,
  });

  try {
    const savedVehicule = await vehicule.save();
    res.send("Vehicule added");
  } catch (err) {
    res.status(400).send(err);
  }
});
//get name
router.post("/data", async (req, res) => {
  const user = await User.findOne({ mail: req.body.mail });

  res.send(user);
});
//get Missions
router.post("/filterMissions", async (req, res) => {
  const mission = await Mission.find({ status: req.body.status });

  return res.send(mission);
});

// delete user
router.post("/delete", async (req, res) => {
  const user = await User.deleteOne({ mail: req.body.mail });

  res.send("deleted");
});
// delete Vehicule
router.post("/deleteV", async (req, res) => {
  const vehicule = await Vehicule.deleteOne({ matricule: req.body.matricule });

  res.send("deleted");
});
// delete Mission
router.post("/deleteM", async (req, res) => {
  const mission = await Mission.deleteOne({ _id: req.body._id });

  res.send("deleted");
});

//login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ mail: req.body.mail });
  if (!user) return res.status(200).send("mail doesnt exist");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("invalid password");
  if (validPass) return res.send(user);

  // login token

  /* const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET );
   res.header('auth-token',token).send(token); */

  // delete user
});

module.exports = router;
