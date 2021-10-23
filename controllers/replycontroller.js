const router = require('express').Router();
const { Reply } = require("../models");
const validateSession = require('../middleware/validate-session');

// create a new reply

router.post('/create', validateSession, async (req, res) => {
    const user = req.user;
    const reviews = req.reviews;
    // const query = {
    //     where: {
    //         Role: req.user.role: "Owner"
    //     }
    // };
    const {
      reply
    } = req.body.reply;
    try {
        const newReply = await Reply.create ({
            reply: reply,
            reviewsId: reviews.id,
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
router.delete('/Delete/:replyId', validateSession, (req, res) =>{
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

module.exports = router;

module.exports = router;