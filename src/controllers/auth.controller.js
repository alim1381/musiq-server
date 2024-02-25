const authService = require("../services/auth.service");
const Controller = require("./controller");

class AuthController extends Controller {
  #authService;
  constructor() {
    super();
    this.#authService = authService;
  }

  async signUp(root, { username, password }) {
    let newUser = await this.#authService.createUser({ username, password });
    return newUser;
  }

  async signIn(root, { username, password }) {
    let user = await this.#authService.loginUser({ username, password });
    return user;
  }
}

module.exports = new AuthController();
