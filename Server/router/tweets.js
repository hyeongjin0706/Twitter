import express from "express";
import * as tweetController from '../controller/tweet.js'

const router = express.Router();

// GET
// /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET
// /tweets/:id
router.get('/:id', tweetController.getTweetById)

// POST
// id: Date.now().toString()
router.post('/', tweetController.addTweet);

// PUT
// text만 수정
router.put('/:id', tweetController.updateTweet)

router.delete('/:id', tweetController.deleteTweet);

export default router;