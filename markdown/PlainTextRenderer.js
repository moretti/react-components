export default class PlainTextRenderer {
  code(code) { return code; }
  blockquote(quote) { return quote; }
  html(html) { return '&nbsp;'; }
  heading(text, level, raw) { return `${text} `; }
  hr() { return '&nbsp;'; }
  list() { return '&nbsp;'; }
  listitem(text) { return `${text} `; }
  paragraph(text) { return `${text} `; }
  table() { return '&nbsp;'; }
  tablerow() { return '&nbsp;'; }
  tablecell() { return '&nbsp;'; }
  strong(text) { return text; }
  em(text) { return text; }
  codespan(text) { return `${text} `; }
  br() { return '&nbsp;'; }
  del(text) { return text; }
  link(href, title, text) { return text; }
  image() { return '&nbsp;'; }
  text(text) { return text; }
}
