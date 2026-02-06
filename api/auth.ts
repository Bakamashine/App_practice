import { useContext } from "react";
import $unAuthApi from "../config/unAuthApi";
import { AuthContext } from "../app/root";
import Api from "./api";
import $AuthApi from "../config/AuthApi";

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
  static nameKey = "name";
  static emailKey = "email";

  userTable = "users";

  // accessTokenRow = "accessToken";
  // refreshTokenRow = "refreshToken";
  // emailRow = "email";
  // nameRow = "name";

  public getObject() {
    return Auth;
  }

  // protected SaveIntoDB(
  //   accessToken: string,
  //   refreshToken: string,
  //   email: string,
  //   name: string,
  // ) {
  //   const stmt = this.db.prepare(`insert into ${this.userTable} (
  //     ${this.accessTokenRow}, ${this.refreshTokenRow}, ${this.emailRow}, ${this.nameRow})
  //     values (?, ?, ?, ?)
  //     ) `);

  //   stmt.run(accessToken, refreshToken, email, name);
  //   console.log("Save into db successed");
  // }

  protected SetToken({ access, refresh }: LoginResponse) {
    console.log("Access token: ", access);
    console.log("Refresh token: ", refresh);
    localStorage.setItem(Auth.accessKey, access);
    localStorage.setItem(Auth.refreshKey, refresh);
  }

  GetAccessToken(): string|null {
    return localStorage.getItem(Auth.accessKey)
  }

  protected async GetNameAndEmail() {
    const response = await $AuthApi.get("/getuser");
    const name = response.data.username as string;
    const email = response.data.email as string;
    console.log("Username: ", name);
    console.log("Email: ", email);
    localStorage.setItem(Auth.nameKey, response.data.username);
    localStorage.setItem(Auth.emailKey, response.data.email);
  }

  async Login(username: string, password: string): Promise<void | LoginError> {
    const response = await $unAuthApi.post("/token", {
      username,
      password,
    });
    this.LogResponse("Login result", response);
    if (this.CheckStatus(response.status)) {
      this.SetToken({
        access: response.data.access,
        refresh: response.data.refresh,
      });
      await this.GetNameAndEmail();
      // if (name && email)
      //   this.SaveIntoDB(response.data.access, response.data.refresh, email, name);
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
    this.LogResponse("Register result", response);

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
