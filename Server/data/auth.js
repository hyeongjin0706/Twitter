import {getUsers} from "../db/database.js";
import MongoDB from "mongodb";

const ObjectID = MongoDB.ObjectId;

export async function searchID(username) {
    return getUsers().find({username})
    .next()
    .then(mapOptionalUser);
}

export async function findById(id) {
    return getUsers()
    .find({ _id: new ObjectID(id)})
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
    return user ? {...user, id:user._id.toString()} : user;
}

export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => {
        console.log(result);
        // result.ops[0]._id.toString();
    });
}