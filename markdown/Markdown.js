import React, { Component, PropTypes } from 'react';
import marked, { Renderer as MarkdownRenderer } from 'marked';
import trunc from 'lodash/string/trunc';
import cx from 'classnames';
import PlainTextRenderer from './PlainTextRenderer';
import styles from './Markdown.css';

const markdedOptions = {
  sanitize: true,
  gfm: true,
  tables: false,
  breaks: true,
};

export default class Markdown extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    truncate: PropTypes.number,
    renderAs: PropTypes.oneOf(['markdown', 'plainText']).isRequired,
  };

  static defaultProps = {
    renderAs: 'markdown',
  };

  renderMarkdown() {
    const { truncate, value, renderAs } = this.props;
    const isPlain = renderAs === 'plainText';
    let output = value;

    const opts = {
      ...markdedOptions,
      ...{
        renderer: isPlain ?
          new PlainTextRenderer() :
          new MarkdownRenderer(),
      },
    };

    output = marked(output || '', opts);

    if (truncate) {
      output = trunc(output, truncate);
    }

    return output;
  }

  render() {
    return (
      <div
        className={cx(styles.markdown, this.props.className)}
        dangerouslySetInnerHTML={{ __html: '<b></b>' + this.renderMarkdown() }}
      />
    );
  }
}
