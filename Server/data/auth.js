import {getUsers} from "../db/database.js";
import MongoDB from "mongodb";

const ObjectID = MongoDB.ObjectId;

export async function searchID(username) {
    return getUsers.findOne({username}).then((data) => {
        console.log(data);
    });
}

export async function findById(id) {
    return null;
}

export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => {
        console.log(result);
        // result.ops[0]._id.toString();
    });
}