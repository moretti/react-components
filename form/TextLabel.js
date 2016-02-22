import React, { Component } from 'react';
import { TextLabel as TextLabelPropTypes } from './propTypes';
import styles from './styles.css';
import cx from 'classnames';

export default class TextLabel extends Component {
  render() {
    const classes = cx(styles.textLabel, {
      [styles.textLabelBorderlessHasValue]: this.props.hasValue || this.props.hasFocus,
      [styles.textLabelBorderlessHasError]: this.props.hasError,
    });

    return (
      <label
        className={classes}
        htmlFor={this.props.for}>
        {this.props.text}
      </label>
    );
  }
}

TextLabel.propTypes = TextLabelPropTypes;
TextLabel.defaultProps = {
  layout: 'default',
};
