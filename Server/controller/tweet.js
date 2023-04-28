import * as tweetRepository from '../data/tweets.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
};

export async function getTweetById(req, res) {
    const id = req.params.id;
    const tweet = await(tweetRepository.getById(id));
    if(tweet){
        res.status(200).json(tweet);
    }
    else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
};

export async function addTweet(req, res) {
    const { text, name, username} = req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    };
    await(tweetRepository.addTweet(tweet));

    res.status(201).json(tweet);
};

export async function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await(tweetRepository.setTweet(id, text));;
    if(tweet){
        res.status(200).json(tweet);
    }
    else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
};

export async function deleteTweet(req, res) {
    const id = req.params.id;
    const tweet = await(tweetRepository.getById(id));
    if (tweet) {
        await(tweetRepository.deleteTweet(id));
        res.send(204);
    }
};