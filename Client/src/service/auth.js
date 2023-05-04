export default class AuthService {
  constructor(http, tokenStorage){
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async login(username, password) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    console.log("들어옴!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const data = await this.http.fetch("/auth/me", {method: "GET", headers:this.tokenStorage.getToken()});
    console.log("들어옴222222222222222222222");
    return data;
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url
      })
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }
}
