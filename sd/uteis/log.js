const colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  fg: {
    Black: '\x1b[1;30m',
    Red: '\x1b[1;31m',
    Green: '\x1b[1;32m',
    Yellow: '\x1b[1;33m',
    Blue: '\x1b[1;34m',
    Magenta: '\x1b[1;35m',
    Cyan: '\x1b[1;36m',
    White: '\x1b[1;37m',
    Crimson: '\x1b[1;38m',
  },
  bg: {
    Black: '\x1b[40m',
    Red: '\x1b[41m',
    Green: '\x1b[42m',
    Yellow: '\x1b[43m',
    Blue: '\x1b[44m',
    Magenta: '\x1b[45m',
    Cyan: '\x1b[46m',
    White: '\x1b[47m',
    Crimson: '\x1b[48m',
  },
};
export const logerro = string => {
  console.log(colors.fg.Red, string, colors.Reset);
};
export const logsucesso = string => {
  console.log(colors.fg.Green, string, colors.Reset);
};
