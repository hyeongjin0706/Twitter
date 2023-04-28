let tweets = [
    {
        id:"1",
        text:"첫 트윗입니다!!",
        createdAt: Date.now().toString(),
        name: "apple",
        username : "김사과",
        url: ""
    },
    {
        id:"2",
        text:"안녕하세요!!",
        createdAt: Date.now().toString(),
        name: "banana",
        username : "반하나",
        url: ""
    }
];

export async function getAllByUsername(username) {
    return tweets.filter((tweet) => tweet.username === username);
}

export async function getAll(){
    return tweets;
}

export async function getById(id) {
    return tweets.find((tweet) => tweet.id === id);
}

export async function addTweet(tweet) {
    tweets = [tweet, ...tweets];
}

export async function setTweet(id,text) {
    const tweet = await(getById(id));
    tweet.text = text;
    return tweet;
}

export async function deleteTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}