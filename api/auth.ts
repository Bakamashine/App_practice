import $unAuthApi from "../config/unAuthApi";

export interface LoginResponse {
  refresh: string;
  access: string;
}
class Auth {
  static accessKey = "access";
  static refreshKey = "refresh";

  protected SetToken({ access, refresh }: LoginResponse) {
    console.log("Access token: ", access);
    console.log("Refresh token: ", refresh)
    localStorage.setItem(Auth.accessKey, access);
    localStorage.setItem(Auth.refreshKey, refresh);
  }

  async Login(username: string, password: string): Promise<void|string> {
    const response = await $unAuthApi.post("/token", {
      username,
      password,
    });
    console.log("Login result response: ", response);
    console.log("Login result: ", response.data);
    if (response.status != 401) {
      this.SetToken({
        access: response.data.access,
        refresh: response.data.refresh,
      });
    } else {
        return response.data.detail as string;
    }

  }

  Logout() {
    localStorage.clear();
  }
}

export default new Auth();
