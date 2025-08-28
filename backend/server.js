const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/trivia_game", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            score: { type: Number, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    category: { type: String, required: true },
});
const Question = mongoose.model("Question", questionSchema);

// Paginated questions endpoint
app.get("/api/questions", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Question.countDocuments();
    const questions = await Question.find().skip(skip).limit(limit);

    res.json({
        questions,
        totalPages: Math.ceil(total / limit),
    });
});

app.get("/api/questions/:id", async (req, res) => {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Not found" });
    res.json(question);
});

app.post("/api/questions", async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.patch("/api/questions/:id/toggle", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: "Not found" });

        question.isActive = !question.isActive;
        await question.save();

        res.json(question);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/api/questions/:id", async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});