import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Autosuggest as AutosuggestPropTypes } from './propTypes';
import './Autosuggest.css';
import styles from './styles.css';
import cx from 'classnames';

export default class AutosuggestField extends Component {
  emit(type, ...params) {
    const handler = this.props[type];

    if (handler) {
      return handler(...params);
    }
  }

  onChange = (selection, event) => {
    event.preventDefault();
    let result = selection;
    if (this.props.config.suggestionResult) {
      result = this.props.config.suggestionResult(selection);
    }
    if (this.props.onChange) {
      this.props.onChange(result);
    }
  }

  render() {
    const inputAttrs = {
      value: this.props.value,
      autoFocus: this.props.autoFocus,
      placeholder: this.props.placeholder,
      className: cx(
        styles.input,
        {[styles.inputHasError]: this.props.hasError },
        {[styles.inputSmall]: this.props.size === 'small' },
        {[styles.inputMedium]: this.props.size === 'medium' },
        {[styles.inputLarge]: this.props.size === 'large' },
        {[styles.inputXLarge]: this.props.size === 'xlarge' },
        {[styles.solid]: this.props.theme === 'solid'},
      ),
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      style: this.props.style,
    };

    const outerClasses = cx(
      styles.autosuggestContainer,
    );

    return (
      <div className={outerClasses}>
        <Autosuggest
          id={this.props.id}
          suggestions={this.props.config.suggestions}
          suggestionRenderer={this.props.config.suggestionRenderer}
          suggestionValue={this.props.config.suggestionValue}
          inputAttributes={inputAttrs}
          onSuggestionSelected={this.onChange}
        />
        {this.props.hasError && <div className={styles.errorMessage}>{this.props.error}</div>}
      </div>
    );
  }
}

AutosuggestField.propTypes = AutosuggestPropTypes;
