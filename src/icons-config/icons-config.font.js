const globals = require("../../src/globals.json");
const iconCodePoints = require("./icons.codepoints.json");

module.exports = {
  files: ["../resources/icons/svg/*.svg"],
  fontName: globals.iconFont.name,
  classPrefix: globals.iconFont.classPrefix,
  baseSelector: ".icon",
  types: ["eot", "woff", "woff2", "ttf", "svg"],
  fileName: "[fontname].[ext]",
  emitCodepoints: {
    fileName: "icons.codepoints.json",
    type: "json",
  },
  codepoints: iconCodePoints,
  publicPath: globals.customer.themeModule,
};
