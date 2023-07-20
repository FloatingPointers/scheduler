
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
        openTime: {
            type: Date,
            default: new Date().setHours(8, 0)
        },
        closeTime: {
            type: Date,
            default: new Date().setHours(17, 0)
        },
        roles: [{
            type: String,
        }],
        startDay: {
            type: Date,
            default: new Date()
        },
        endDay: {
            type: Date,
            default: new Date()
        }
    },


});

module.exports = mongoose.model('STORE', Store);