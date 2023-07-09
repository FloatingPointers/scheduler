const mongoose = require('mongoose');

const Store = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },

    name: {
        type: String,
    },
    employees: [{
        employeeId: mongoose.ObjectId,
    }],
    schedules: [{
        scheduleId: mongoose.ObjectId,
    }],


    settings: {
        email: {
            type: String,
            // required: true
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