const router = require('express').Router();
const { Reviews } = require("../models");
const validateSession = require('../middleware/validate-session');


// create a new review
router.post('/', validateSession, async (req, res) => {
    const user = req.user;
    const {
       locationName,
       review,
       isFree,
       numStall,
       isHelpful,
       stallType
    } = req.body.reviews;
    try {
        const newReview = await Reviews.create({
            locationName: locationName,
            review: review,
            isFree: isFree,
            numStall: numStall,
            isHelpful: isHelpful,
            stallType: stallType,
            userId: user.id,
            owner: user.username,
        });
        res.status(200).json({
            message: 'New Review Created!',
            review: newReview,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating review try again.',
            error: error,
        });
        console.log(error);
    }
});

module.exports = router;
