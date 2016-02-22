import React, { Component } from 'react';
import { TextInput as InputPropTypes } from './propTypes';
import styles from './styles.css';
import cx from 'classnames';

export default class TextInput extends Component {
  render() {
    const isInline = this.props.layout && this.props.layout.match(/^inline/);

    const classes = cx(
      styles.input,
      styles.textArea,
      styles.solid,
      {[styles.inputHasError]: this.props.hasError },
      {[styles.inputSmall]: this.props.size === 'small' },
      {[styles.inputMedium]: this.props.size === 'medium' },
      {[styles.inputLarge]: this.props.size === 'large' },
      {[styles.inputXLarge]: this.props.size === 'xlarge' },
    );

    const outerClasses = cx(
      styles.inputContainer,
    );

    return (
      <div className={outerClasses}>
        <input
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          id={this.props.id}
          maxLength={this.props.maxLength}
          minLength={this.props.minLength}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          placeholder={this.props.placeholder}
          required={this.props.required}
          readOnly={this.props.readonly}
          className={classes}
          value={this.props.value}
          type={this.props.type}
        />
        {this.props.hasError && <div className={styles.errorMessage}>{this.props.error}</div>}
        {this.props.help && <div className={styles.helpText}>
          {this.props.help}
        </div>}
      </div>
    );
  }
}

TextInput.defaultProps = {
  type: 'text',
  layout: 'default',
};

TextInput.propTypes = InputPropTypes;
