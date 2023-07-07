const mongoose = require('mongoose');

const Store = new mongoose.Schema({
    storeID: {
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
        email: {
            type: String,
            required: true
        },
        openTime: {
            type: Date,
        },
        closeTime: {
            type: Date,
        },
        roles: [{
            type: String,
        }],
        startDay: {
            type: Date,
        },
        endDay: {
            type: Date,
        }
    }

});

module.exports = mongoose.model('Store', Store);