export default class TweetService {
  // 네트워크를 통해 데이터 가져오기
  constructor(http, tokenStorage) {
    this.http = http;
    // tokenStorage를 프로퍼티에 추가
    this.tokenStorage = tokenStorage;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method:"GET", 
      headers: this.getHeaders()
    });
    // if (username) {
    //   return fetch(`http://localhost:8080/tweets?username=${username}`)
    //     .then((response) => response.json())
    //     .then((data) => data);
    // }
    // else{
    //   return fetch('http://localhost:8080/tweets')
    //     .then((response) => response.json())
    //     .then((data) => data);
    // }
  }

  async postTweet(text) {
    // fetch를 통해 /tweets post로 입력한 데이터를 전송
    return this.http.fetch("/tweets", {
      method:"POST",
      body: JSON.stringify({text, username:"admin", name:"admin"}),
      headers: this.getHeaders()
    });

    // const data = {
    //   text,
    //   "createdAt": Date.now().toString(),
    //   "name": "admin",
    //   "username" : "admin"
    // }

    // const options = {method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(data)
    //   }

    // return fetch('http://localhost:8080/tweets', options);
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`,{
      method: "DELETE",
      headers: this.getHeaders()
    });
    // const options = {method: 'DELETE'}
    // return fetch(`http://localhost:8080/tweets/${tweetId}`, options);
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`,{
      method: "PUT",
      body:JSON.stringify({text}),
      headers: this.getHeaders()
    });
    // const data = {
    //   text
    // }

    // const options = {method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(data)
    //   }
    //   return fetch(`http://localhost:8080/tweets/${tweetId}`, options);
  }

  // 토큰을 얻어내는 함수
  getHeaders(){
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`
    };
  }
}
