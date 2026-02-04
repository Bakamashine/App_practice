import auth from "./auth";

class User {
  getName() {
    return localStorage.getItem(auth.getObject().nameKey);
  }
  getEmail() {
    return localStorage.getItem(auth.getObject().emailKey);
  }
}

export default new User();
