const router = require('express').Router();
const { Reply, User } = require("../models");
const validateSession = require('../middleware/validate-session');

// create a new reply

router.post('/createReply/:reviewId', validateSession, async (req, res) => {
    const user = req.user;
    const reviewId = req.params.reviewId;
   

    ///Must pass reviewId on client side in json in order to create reply

    const {
      reply
    } = req.body.reply;
    try {
        const newReply = await Reply.create ({
            where:{ role: "owner"},
            reply: reply,
            reviewId: reviewId,
            userId: user.id
        });
        res.status(200).json({
            message: 'reply posted',
            reviews: newReply,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error trying to post reply',
            error: error,
        });

    }
});

//delete the reply
router.delete('/deleteReply/:replyId', validateSession, (req, res) =>{
    let replyId = req.params.replyId;
    const query = {
        where: {id: replyId, userId: req.user.id}
    };
    Reply.destroy(query)
    .then(() => res.status(200).json({message: 'This reply has been deleted'}))
    .catch((err) => 
    res.status(500).json({ error: err, message: 'Error occurred, reply has not been deleted'})
    );
})
//setup delete button on front end to only show if they created the reply, done through a chain of events
module.exports = router;

