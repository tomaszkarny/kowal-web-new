/**
 * Chalk Compatibility Layer
 * 
 * This is a simple compatibility layer for chalk v5+ in CommonJS environments.
 * It provides basic ANSI color functions that mimic the chalk API.
 */

// Simple color functions using ANSI codes
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  white: (text) => `\x1b[37m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Create a chalk-like API
const chalk = {
  red: colors.red,
  green: colors.green,
  yellow: colors.yellow,
  blue: colors.blue,
  magenta: colors.magenta,
  cyan: colors.cyan,
  white: colors.white,
  gray: colors.gray,
  bold: colors.bold
};

// Add methods for combined styles
chalk.red.bold = (text) => colors.red(colors.bold(text));
chalk.green.bold = (text) => colors.green(colors.bold(text));
chalk.yellow.bold = (text) => colors.yellow(colors.bold(text));
chalk.blue.bold = (text) => colors.blue(colors.bold(text));
chalk.cyan.bold = (text) => colors.cyan(colors.bold(text));
chalk.magenta.bold = (text) => colors.magenta(colors.bold(text));

module.exports = chalk;
