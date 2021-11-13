const router = require('express').Router();
const { Photo } = require("../models");
const validateSession = require('../middleware/validate-session');
const sequelize = require('../db');


router.post('/create', validateSession, async (req, res) => {
    const user = req.user;
    const reviews = req.reviews;
    const {
        photoUrl
    } = req.body.photo;
    try {
        const newPhoto = await Photo.create ({
            photoUrl: photoUrl,
            reviewsId: reviews.id,
            userId: user.id
        });
        res.status(200).json({
            message: 'photo posted',
            reviews: newReview,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error trying to post photo',
            error: error,
        });

    }
});
   

//delete the photo
router.delete('/Delete/:photoId', validateSession, (req, res) =>{
    let photoId = req.params.photoId;
    const query = {
        where: {id: photoId, userId: req.user.id}
    };
    Photo.destroy(query)
    .then(() => res.status(200).json({message: 'This photo has been deleted'}))
    .catch((err) => 
    res.status(500).json({ error: err, message: 'Error occurred, photo has not been deleted'})
    );
})

module.exports = router;