const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/WT_PBL`);
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number },
    income: { type: Number, required: true },
});

module.exports = mongoose.model("user" ,userSchema);