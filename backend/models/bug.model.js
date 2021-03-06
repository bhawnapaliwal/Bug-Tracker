const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bugSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    //duration: {type: String, required: true},
    status: {type: String, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;