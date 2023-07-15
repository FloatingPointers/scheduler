const mongoose = require('mongoose');

const Store = new mongoose.Schema({

    name: { //The name of the store or manager in charge
        type: String,
    },
    
    employees: [{
        employeeId: mongoose.ObjectId,
    }],
    schedules: [{
        scheduleId: mongoose.ObjectId,
    }],
    inviteCode: {
        type: String,
        required: true
    },


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

module.exports = mongoose.model('STORE', Store);