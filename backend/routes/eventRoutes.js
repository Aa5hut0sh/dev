const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// Create Event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({ title, description, date, location, createdBy: req.user.id });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
