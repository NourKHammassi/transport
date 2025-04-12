const Message = require("../models/Message"); // Import the model

// Create a new message
exports.createMessage = async (req, res) => {
  try {
    const { name, lastName, email, message } = req.body;

    // Validate fields
    if (!name || !lastName || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ name, lastName, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
