import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Contact from "./models/Contact.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// POST API to store contact form data
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create new contact document
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Contact saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
