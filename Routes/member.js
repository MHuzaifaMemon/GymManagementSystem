const express = require('express');
const router = express.Router();
const MemberController = require('../Controllers/member');
const auth = require('../Auth/auth');

router.get('/all-member',auth, MemberController.getAllMembers);
router.post('/register-member', auth, MemberController.registerMember);
router.get('/searched-members', auth, MemberController.searchMember);
router.get('/monthly-member', auth, MemberController.monthlyMember);
router.get('/within-3-days-expiring', auth, MemberController.expiringWithin3Days);
router.get('/within-4-7-days-expiring', auth, MemberController.expiringWithin4To7Days);
router.get('/expired-member', auth, MemberController.expiredMember);
router.get('/inactive-member', auth, MemberController.inActiveMember);

module.exports = router;