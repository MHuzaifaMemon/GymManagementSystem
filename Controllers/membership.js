const Membership = require('../Modals/membership');


exports.addMembership = async (req, res) => {
    try{
        const {months, price} = req.body;
        const membership = await Membership.findOne({gym:req.gym._id,months});
        if(membership){
            membership.price = price;
            await membership.save();
            res.status(200).json({
                message: 'Membership updated successfully',
                membership
            });
        }else{
            const newMembership = new Membership({
                price,
                months,
                gym: req.gym._id
            });
            await newMembership.save();
            res.status(200).json({
                message: 'Membership added successfully',
            });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ 
            error: 'Server error'
        });
    } 
}
exports.getmembership = async (req, res) => {
    try {
        const loggedInId = req.gym._id;
        const membership = await Membership.find({gym: loggedInId});
        res.status(200).json({
            message: 'Memberships fetched successfully',
            membership : membership
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Server error'
        });
    }
}