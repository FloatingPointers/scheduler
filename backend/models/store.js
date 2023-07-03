const mongoose = require('mongoose');

const Store = new mongoose.Schema({
    storeID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    userID: {
        type: ObjectID,
        required: true
    },
    employees: [{
        employeeID: {type: ObjectID},
    }],
    schedules: [{
        scheduleID: {type: ObjectID},
    }],
    settings: {
        type: String,
    },
    // Other store-related fields



    

});

module.exports = mongoose.model('Store', Store);