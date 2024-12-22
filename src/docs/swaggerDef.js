const { version } = require("../../package.json");
const config = require("../config/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "FLBK Platform API",
    version,
    license: {
      name: "MIT",
      url: "https://github.com/SE100-P12-UIT/FLBK-BE/blob/master/LICENSE",
    },
  },
  servers: [
    {
      url: `${config.host}/v1`,
    },
  ],
};

module.exports = swaggerDef;
