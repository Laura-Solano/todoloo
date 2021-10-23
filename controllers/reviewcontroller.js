const router = require('express').Router();
const { Reviews } = require("../models");
const validateSession = require('../middleware/validate-session');
const sequelize = require('../db');

// create a new review
router.post('/create', validateSession, async (req, res) => {
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
            userId: user.id
        });
        res.status(200).json({
            message: 'New Review Posted!',
            reviews: newReview,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating review, try again.',
            error: error,
        });
        console.log(error);
    }
});


//edit a review
router.put('/Edit/:reviewId', validateSession, (req, res) =>{
    let reviewId = req.params.reviewId;
    const editReview = {
        locationName: req.body.reviews.locationName,
        review: req.body.reviews.review,
        isFree: req.body.reviews.isFree,
        numStall: req.body.reviews.numStall,
        isHelpful: req.body.reviews.isHelpful,
        stallType: req.body.reviews.stallType,
    };
    const query = {
        where: 
        {id: reviewId, userId: req.user.id}
    };
    Reviews.update(editReview, query)
    .then((reviews) =>
    res.status(200)
    .json({ reviews, message: 'Your review has been updated'})
    )
    .catch((err) =>
    res.status(500).json({ error: err, message: "Error occurred, updates could not be completed"}))
})


//delete the recipe
router.delete('/Delete/:reviewId', validateSession, (req, res) =>{
    let reviewId = req.params.reviewId;
    const query = {
        where: {id: reviewId, userId: req.user.id}
    };
    Reviews.destroy(query)
    .then(() => res.status(200).json({message: 'Your review has been deleted'}))
    .catch((err) => 
    res.status(500).json({ error: err, message: 'Error occurred, review has not been deleted'})
    );
})

//See own reviews
router.get('/mine', validateSession, (req, res) => {
    const user = req.user;
    user.getReviews()
        .then((reviews) => res.status(200).json(reviews))
        .catch((err) =>
            res
                .status(500)
                .json({ error: err, message: 'No reviews found' })
        );
});

// get all reviews
router.get('/', (req, res) => {
    Reviews.findAll({})
        .then((reviews) => res.status(200).json(reviews))
        .catch((err) =>
            res.status(500).json({
                error: err,
                message: 'Error occurred, try again later',
            })
        );
});


module.exports = router;