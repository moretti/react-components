import React, { Component } from 'react';
import cx from 'classnames';
import AutoSizeTextArea from 'react-textarea-autosize';
import { TextArea as TextAreaPropTypes } from './propTypes';
import styles from './styles.css';

export default class TextArea extends Component {
  render() {
    if (this.props.style && process.env.NODE_ENV !== 'production') {
      console.warn('Inline styles are deprecated');
    }

    const { autoFocus, autoSize, cols, disabled, maxLength, minLength, onBlur, onChange, onFocus, onKeyDown, onKeyUp, onKeyPress, placeholder, required, readonly, rows, hasError, size, theme, layout, value } = this.props;

    const isInline = layout && layout.match(/^inline/);

    const classes = cx(
      styles.input,
      styles.textArea,
      {[styles.inputHasError]: hasError },
      {[styles.inputLarge]: size === 'large' },
      {[styles.inputXLarge]: size === 'xlarge' },
      {[styles.borderless]: theme === 'borderless'},
      {[styles.solid]: this.props.theme === 'solid'},
      {[styles.inline]: isInline }
    );

    const outerClasses = cx(
      styles.inputContainer,
      { [styles.inline]: isInline }
    );

    const { ...style } = this.props.style || {};
    if (parseInt(size, 10)) {
      style.fontSize = `${size}px`;
    }

    const textAreaProps = {
      autoFocus,
      cols,
      disabled,
      maxLength,
      minLength,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      placeholder,
      required,
      readOnly: readonly,
      rows,
      style,
      value,
      className: classes,
    };

    return (
      <div className={outerClasses}>
        {autoSize ?
          <AutoSizeTextArea {...textAreaProps} /> :
          <textarea {...textAreaProps} />
        }
      </div>
    );
  }
}

TextArea.defaultProps = {
  cols: 20,
};

TextArea.propTypes = TextAreaPropTypes;
