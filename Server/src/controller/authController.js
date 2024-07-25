const User = require('../models/userModels');

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isMatch = user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        res.json({ username: user.username });
    } catch (error) {
        res.status(400).send(error.message);
    }
};
