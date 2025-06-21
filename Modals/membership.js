const mongoose = require('mongoose');

const MembershipSChema = new mongoose.Schema({
    months: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    gym:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        required: true
    }

})

const modalMembership = mongoose.model('membership', MembershipSChema);

module.exports = modalMembership;