import MongoDB from "mongodb";
import * as userRepository from "../data/auth.js";
import {getTweets} from "../db/database.js";

const ObjectID = MongoDB.ObjectId;
const desc = {createdAt: -1};

export async function getAllByUsername(username) { 
    return getTweets().find({username}).sort(desc).toArray().then(mapTweets);
}

export async function getAll(){
    return getTweets().find({}).sort(desc).toArray().then(mapTweets);
}

export async function getById(id) {
    return getTweets().find({ _id: new ObjectID(id)}).next().then(mapOptionalTweet);
}

export async function addTweet(text, userId) {
    return userRepository.findById(userId)
    .then((user) => getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url
    })).then((result) => console.log(result.ops)).then(mapOptionalTweet);
}

export async function setTweet(id,text) {
    // getTweets().updateOne({ _id: new ObjectID(id)}, {$set:{text}});
    // return getById(id);
    return getTweets().findOneAndUpdate(
        {_id: new ObjectID(id)},
        { $set:{text}},
        {returnOriginal:false} // false로 바꿔서 변경후의 데이터를 가져옴
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function deleteTweet(id) {
    return getTweets().deleteOne({ _id: new ObjectID(id)});
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString()} : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}