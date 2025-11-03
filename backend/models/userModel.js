const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// mongoose.connect(`mongodb://127.0.0.1:27017/WT_PBL`);
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    income: { type: Number },
    Transaction : [
        { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }
    ],
    Debt : [
        { type: mongoose.Schema.Types.ObjectId, ref: "Debt" }
    ],
    
});


module.exports = mongoose.model("UserModel" ,userSchema);