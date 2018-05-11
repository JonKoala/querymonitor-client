import CopyToClipboard from 'copy-to-clipboard'
import SqlFormatter from 'sql-formatter'

import RegexCollection from './regex.collection'

export default {
  inline(text) {
    return (text) ? text.replace(RegexCollection.newline, ' ').replace(RegexCollection.unquotedSpaces, ' ') : null;
  },
  indent(text) {
    return (text) ? SqlFormatter.format(text) : null;
  },
  toClipboard(text) {
    CopyToClipboard(text);
  }
}
