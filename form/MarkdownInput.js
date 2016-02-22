import React, { Component } from 'react';
import { Markdown as MarkdownPropTypes } from './propTypes';
import styles from './MarkdownInput.css';
import TextArea from './TextArea';
import { Button } from '../button';
import Markdown from '../markdown';
import cx from 'classnames';

export default class MarkdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'editor',
    };
  }

  static propTypes = MarkdownPropTypes;

  static defaultProps = {
    autoSize: true,
    displayControls: true,
  }

  handleChange = event => {
    const value = event.target.value;
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  toggleMode = () => {
    this.setState({
      mode: this.state.mode === 'editor' ? 'preview' : 'editor',
    });
  }

  showHelp = () => {
    this.refs.help.open();
  }

  render() {
    const { mode } = this.state;
    const { displayControls } = this.props;
    return (
      <div className={styles.container}>
        {mode === 'editor' ? this.renderEditor() : this.renderPreview()}
        {displayControls && this.renderControls()}
      </div>
    );
  }

  renderPreview() {
    const { value, previewClassName } = this.props;
    return (
      <Markdown className={cx(styles.preview, previewClassName)} value={value} />
    );
  }

  renderEditor() {
    const { hasError, error, theme } = this.props;

    return (
      <div className={cx(styles.editor, {[styles.bordelessEditor]: theme === 'borderless' })}>
        <TextArea
          {...this.props}
          autoFocus
          onChange={this.handleChange}
          />
          {hasError && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
  }

  renderControls() {
    const { mode } = this.state;
    return (
      <div className={styles.controls}>
        <div className={styles.previewButtonContainer}>
          <Button
            type="button"
            color={mode === 'editor' ? 'gray' : 'blue'}
            size="small"
            fullWidth
            onClick={this.toggleMode}>
            Turn Preview {mode === 'editor' ? 'On' : 'Off'}
          </Button>
        </div>
        <div className={styles.markdownHelpContainer}>
          <Button
            type="button"
            kind="link"
            color="grayDark"
            size="small"
            onClick={this.showHelp}>
            Markdown (?)
          </Button>
        </div>
      </div>
    );
  }
}
