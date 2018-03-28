export default {
  newline: /(?:\r\n|\r|\n)/g,
  unquotedSpaces: /\s+(?=(?:[^']*'[^']*')*[^']*$)/g // avoid spaces inside quotes
}
