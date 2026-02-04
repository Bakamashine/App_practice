import { useContext } from "react";
import $unAuthApi from "../config/unAuthApi";
import { AuthContext } from "../app/renderer";
import Api from "./api"

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface LoginError {
  detail?: string;
}

export interface RegisterError {
  email?: string[];
  password?: string[];
  username?: string[];
}
class Auth extends Api {
  static accessKey = "access";
  static refreshKey = "refresh";

  public getObject() {
    return Auth;
  }

  protected SetToken({ access, refresh }: LoginResponse) {
    console.log("Access token: ", access);
    console.log("Refresh token: ", refresh);
    localStorage.setItem(Auth.accessKey, access);
    localStorage.setItem(Auth.refreshKey, refresh);
  }


  async Login(username: string, password: string): Promise<void | LoginError> {
    const response = await $unAuthApi.post("/token", {
      username,
      password,
    });
    console.log("Login result response: ", response);
    console.log("Login result: ", response.data);
    if (this.CheckStatus(response.status)) {
      this.SetToken({
        access: response.data.access,
        refresh: response.data.refresh,
      });
    } else {
      return response.data;
    }
  }

  async Register(
    username: string,
    email: string,
    password: string,
  ): Promise<void | RegisterError> {
    const response = await $unAuthApi.post("/register", {
      username,
      email,
      password,
    });
    console.log("Register result response: ", response);
    console.log("Register result: ", response.data);

    if (this.CheckStatus(response.status)) {
      this.Login(username, password);
    } else {
      return response.data;
    }
  }

  Logout() {
    localStorage.clear();
  }
}

export default new Auth();
