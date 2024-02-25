const autoBind = require("auto-bind");

class Servise {
  constructor() {
    autoBind(this);
  }
}

module.exports = Servise;
