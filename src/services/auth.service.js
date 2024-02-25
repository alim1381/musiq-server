const userModel = require("../models/user.model");
const Servise = require("./servise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService extends Servise {
  #User;
  constructor() {
    super();
    this.#User = userModel;
  }

  // signUp
  async createUser({ username, password }) {
    let user = await this.findUser(username);
    if (user) throw new Error("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    let newUser = await this.#User.create({ username, password: hashPassword });

    const accessToken = this.signToken({ id: newUser.id });
    return { id: newUser.id, username: newUser.username, token: accessToken };
  }

  // signIn
  async loginUser({ username, password }) {
    let user = await this.findUser(username);
    if (!user) throw new Error("Username not found");

    let isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new Error("Invalid Password");

    const accessToken = this.signToken({ id: user.id });
    return { id: user.id, username: user.username, token: accessToken };
  }

  async findUser(username) {
    let user = await this.#User.findOne({ username });
    return user;
  }

  signToken(payload, expiresIn = "7d") {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
  }
}

module.exports = new AuthService();
