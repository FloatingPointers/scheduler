
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
            type: Number,
            default: 1
        },
        endDay: {
            type: Number,
            default: 6 //this is a string, thanks jobin. 
        }
    },


});

module.exports = mongoose.model('STORE', Store);