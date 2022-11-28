const mongoose = require("mongoose")

const SmoothieSchema = new mongoose.Schema({
    name: String,
    ingredient: [],
    photo: String,
    direction: String,
    level: String,
    total: Number,
    like: { type: Number, default: 0 },
    comments: { type: [], default: [] }
});

const Smoothie = mongoose.model("smoothie", SmoothieSchema)
module.exports = Smoothie
