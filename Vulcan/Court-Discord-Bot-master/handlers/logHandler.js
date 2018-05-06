const COLOR = require('chalk');
const moment = require(`moment`);
const tokens = require(`../tokens.json`);

var currentTime = moment().unix();
var time = moment.unix(currentTime).utc().format("DD-MM-YY | HH:mm:ss");

exports._timestamp = () => {
  return new Date().toLocaleString();
};

exports.warn = (...message) => {
  console.log(COLOR.yellow.bold(`[WARN] [${this._timestamp()}] `));
  console.warn(...message);
  console.log(COLOR.yellow.bold(`[/WARN]`));
};

exports.error = (...message) => {
  console.log(COLOR.red.bold(`[ERROR] [${this._timestamp()}] `));
  console.warn(...message);
  console.log(COLOR.red.bold(`[/ERROR]`));
};

exports.info = (...message) => {
  console.log(COLOR.cyan.bold(`[${this._timestamp()}] ${tokens.name} > ` + COLOR.yellow(...message)));
};

exports.message = message => {
  console.log(COLOR.cyan.bold(`[${this._timestamp()}] ${tokens.name} > ` + COLOR.yellow(...message)));
};

exports.console = (...message) => {
  console.log(...message);
};
