const  Member  = require('../Modals/member');
const Membership = require('../Modals/membership');

exports.getAllMembers = async (req, res) => {
    try{
        const {skip,limit} = req.query;
        const members = await Member.find({gym: req.gym._id})
        const totalMembers = members.length;
// fetching members with pagination
        const limitedMembers = await Member.find({gym: req.gym._id})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);
        res.status(200).json({
            message: members.length?"Fetched members successfully": "No members Registered Yet",
            members: limitedMembers,
            totalMembers: totalMembers,
        });

    }catch(error){
        console.error("Error fetching members:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function addMonthsToDate(months,joiningDate) {
    
    // Get current year, month, and day
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Months are 0-indexed
    const currentDay = today.getDate();
  
    // Calculate the new month and year
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth / 12);
  
    // Calculate the correct future month (modulus for month)
    const adjustedMonth = futureMonth % 12;
  
    // Set the date to the first of the future month
    const futureDate = new Date(futureYear, adjustedMonth, 1);
  
    // Get the last day of the future month
    const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();
  
    // Adjust the day if current day exceeds the number of days in the new month
    const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);
  
    // Set the final adjusted day
    futureDate.setDate(adjustedDay);
  
    return futureDate;
  }


exports.registerMember = async (req, res) => {
    try{
        const { name, mobileNo, address, membership, profilePic, joiningDate} = req.body;
        const member = await Member.findOne({ gym:req.gym._id ,mobileNo});
        if(member){
            return res.status(409).json({ error: 'Member already exists with this mobile number' });
        }   

        const memberShip = await Membership.findOne({_id: membership, gym: req.gym._id });
        const membershipMonth = memberShip.months;
        if(memberShip){
            let jngDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth, jngDate);
            let newmember = new Member({
                name,
                mobileNo,
                address,
                membership,
                gym: req.gym._id,
                profilePic,
                nextBillDate,
            });
            await newmember.save();
            res.status(200).json({
                message: 'Member registered successfully',
                newmember
            });

        }else{
            return res.status(409).json({ error: 'Membership not found' });
        }

    }catch(error){
        console.error("Error registering member:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.searchMember = async (req, res) => {
    try{
        const { searchTerm } = req.query;
        const member = await Member.find({
            gym: req.gym._id,
            $or: [
                { name: { $regex: '^' + searchTerm, $options: 'i' } },
                { mobileNo: { $regex: '^' + searchTerm, $options: 'i' } }
            ]
        });
        res.status(200).json({
            message: member.length ? "Members found" : "No members found",
            members: member,
            totalMembers: member.length
        });
        

    }catch(error){
        console.error("Error searching members:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.monthlyMember = async (req, res) => {
    try{
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0,23,59,59,999); // Last day of the month

        const members = await Member.find({
            gym: req.gym._id,
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        }).sort({ createdAt: -1 });
        res.status(200).json({
            message: members.length ? "Monthly members fetched successfully" : "No members registered this month",
            members: members,
            totalMembers: members.length
        });

    }catch(error){
        console.error("Error fetching monthly members:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.expiringWithin3Days = async (req, res) => {
    try{
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate() + 3);
        const members = await Member.find({
            gym: req.gym._id,
            nextBillDate: {
                $gte: today,
                $lte: nextThreeDays
            }
        });
        res.status(200).json({
            message: members.length ? "Expiring members fetched successfully" : "No members expiring within 3 days",
            members: members,
            totalMembers: members.length
        });

    }catch(error){
        console.error("Error fetching expiring members:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.expiringWithin4To7Days = async (req, res) => {
    try{
        const today = new Date();
        const next4Days = new Date();
        next4Days.setDate(today.getDate() + 4);
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);
        const members = await Member.find({
            gym: req.gym._id,
            nextBillDate: {
                $gte: next4Days,
                $lte: next7Days
            }
        });

        res.status(200).json({
            message: members.length ? "Members expiring within 4 to 7 days fetched successfully" : "No members expiring within 4 to 7 days",
            members: members,
            totalMembers: members.length
        }); 
        
        

    }catch(error){
        console.error("Error fetching members expiring within 4 to 7 days:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.expiredMember = async (req, res) => {
    try{
        const today = new Date();
        const members = await Member.find({
            gym: req.gym._id,
            status: 'active', // Assuming you have a status field to check if the member is active
            nextBillDate: { $lt: today }
        });
        res.status(200).json({
            message: members.length ? "Expired members fetched successfully" : "No expired members found",
            members: members,
            totalMembers: members.length
        });
    }catch(error){
        console.error("Error fetching expired members:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.inActiveMember = async (req, res) => {
    try{
        const members = await Member.find({
            gym: req.gym._id,
            status: 'Pending' // Assuming 'Pending' status indicates inactive members
        }); 
        res.status(200).json({
            message: members.length ? "Inactive members fetched successfully" : "No inactive members found",
            members: members,
            totalMembers: members.length
        });
    }catch(error){
        console.error("Error fetching inactive members:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getMemberDetails = async (req, res) => {
    try{
        const {id}= req.params;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });
        if(!member){
            return res.status(400).json({ error: 'Member not found' });
        }
        res.status(200).json({
            message: "Member details fetched successfully",
            member: member
        });
    }catch(error){
        console.error("Error fetching member details:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.changeStatus = async (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const member = await Member.findOne(
            { _id: id, gym: req.gym._id }
        );
        if(!member){
            return res.status(400).json({ error: 'Member not found' });
        }
        member.status = status;
        await member.save();
        res.status(200).json({
            message: 'Member status updated successfully',
            // member: member
        });
    }catch(error){
        console.error("Error updating member status:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateMemberPlan = async (req, res) => {  
    try{
        const {membership} = req.body;
        const {id} = req.params;
        const memberShip = await Membership.findOne({gym: req.gym._id, _id: membership});
        if(memberShip){
            let getMonth = memberShip.months;
            let today = new Date(); 
            let nextBillDate = addMonthsToDate(getMonth, today);
            const member = await Member.findOne({ gym: req.gym._id,_id: id });
            if(!member){
                return res.status(409).json({ error: 'Member not found' });
            }
            member.nextBillDate = nextBillDate;
            member.lastPayment = today;

            await member.save();
            res.status(200).json({
                message: 'Member plan updated successfully',
                member
            });
        }else{
            return res.status(409).json({ error: 'Membership not found' });
        }

    }catch(error){
        console.error("Error updating member plan:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}