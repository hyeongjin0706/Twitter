import MongoDB from "mongodb";
import Mongoose from "mongoose";
import * as userRepository from "../data/auth.js";
import {getTweets, useVirtualId} from "../db/database.js";

const tweetSchema = new Mongoose.Schema({
    text:{type:String, required: true},
    userId:{type:String, required: true},
    name:{type:String, required: true},
    username:{type:String, required: true},
    url: String
}, {timestamps:true})

useVirtualId(tweetSchema);
const Tweet = Mongoose.model("Tweet", tweetSchema)


export async function getAllByUsername(username) { 
    return Tweet.find({username}).sort({createdAt:-1});
}

export async function getAll(){
    return Tweet.find().sort({createdAt: -1});
}

export async function getById(id) {
    return Tweet.findById(id);
}

export async function addTweet(text, userId) {
    return userRepository.findById(userId)
    .then((user) => new Tweet({
        text,
        userId,
        name: user.name,
        username: user.username
    }).save());
}

export async function setTweet(id,text) {
    // getTweets().updateOne({ _id: new ObjectID(id)}, {$set:{text}});
    // return getById(id);
    return Tweet.findOneAndUpdate(
        {_id: id},
        { $set:{text}},
        {returnOriginal:false} // false로 바꿔서 변경후의 데이터를 가져옴
    );
}

export async function deleteTweet(id) {
    return Tweet().deleteOne({ _id: id});
}