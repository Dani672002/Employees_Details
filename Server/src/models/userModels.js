const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Method to compare plain text passwords (no hashing involved)
userSchema.methods.comparePassword = function(candidatePassword) {
    return candidatePassword === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
