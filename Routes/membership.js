const express = require('express');
const router = express.Router();
const MembershipController = require('../Controllers/membership');
const auth = require('../backend/Auth/auth');

router.post('/add-Membership',auth,MembershipController.addMembership);
router.get('/get-Membership', auth, MembershipController.getmembership);


module.exports = router;